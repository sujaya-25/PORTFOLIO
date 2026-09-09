"""
GuidEx — Smart Exam Hall Guidance System (2025–2026)
Developer: Sujaya K S (Electronics and Communication Engineering)
Repository: https://github.com/sujaya-25

Description:
Automated exam hall guidance and verification system that authenticates
students using RFID and Biometrics, looks up hall and seat allocations in
real-time from a CSV/database backend, and renders an intuitive graphical
guidance display.

Features:
- Dual Mode: Hardware Serial input mode & Interactive Software Simulator mode
- Real-time verification against CSV student database
- Hall, floor, and desk routing with visual seating map
- Duplicate entry warning and audit logging with CSV export
- CLI test mode (--cli / --simulate) for headless validation
"""

import os
import sys
import csv
import time
from datetime import datetime
import argparse

# Try importing tkinter (may not be present in minimal headless containers)
try:
    import tkinter as tk
    from tkinter import ttk, messagebox, filedialog
    TK_AVAILABLE = True
except ImportError:
    TK_AVAILABLE = False


class GuidExDatabase:
    """Handles CSV data storage, student record retrieval, and verification logic."""

    def __init__(self, csv_path=None):
        if csv_path is None:
            base_dir = os.path.dirname(os.path.abspath(__file__))
            self.csv_path = os.path.join(base_dir, "data", "students.csv")
        else:
            self.csv_path = csv_path
        
        self.students = []
        self.checked_in_roll_numbers = set()
        self.audit_log = []
        self.load_database()

    def load_database(self):
        """Loads student records from CSV file."""
        self.students = []
        if not os.path.exists(self.csv_path):
            return False, f"Database file not found at: {self.csv_path}"

        try:
            with open(self.csv_path, mode="r", encoding="utf-8-sig") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    cleaned = {k.lstrip('\ufeff').strip(): (v.strip() if v else '') for k, v in row.items() if k}
                    self.students.append(cleaned)
            return True, f"Successfully loaded {len(self.students)} student records."
        except Exception as e:
            return False, f"Error reading CSV database: {str(e)}"

    def verify(self, query):
        """
        Authenticates a student by RFID Tag, Fingerprint ID, or Roll Number.
        Returns (status_code, result_dict, message)
        Status codes:
          'SUCCESS': Valid student authenticated
          'DUPLICATE': Valid student already checked in previously
          'NOT_FOUND': Identifier not registered
        """
        query = query.strip()
        if not query:
            return "EMPTY", None, "Scan input is empty."

        matched = None
        match_type = None

        for student in self.students:
            if student.get("rfid_tag", "").lower() == query.lower():
                matched = student
                match_type = "RFID Scan"
                break
            elif student.get("fingerprint_id", "").lower() == query.lower():
                matched = student
                match_type = "Biometric Match"
                break
            elif student.get("roll_no", "").lower() == query.lower():
                matched = student
                match_type = "Roll Number Lookup"
                break

        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        if not matched:
            log_entry = {
                "timestamp": timestamp,
                "status": "DENIED",
                "identifier": query,
                "roll_no": "N/A",
                "name": "UNKNOWN",
                "hall_no": "N/A",
                "notes": "Unrecognized RFID / Biometric ID"
            }
            self.audit_log.append(log_entry)
            return "NOT_FOUND", None, f"Access Denied: Unregistered credential '{query}'"

        roll_no = matched["roll_no"]
        is_duplicate = roll_no in self.checked_in_roll_numbers

        if is_duplicate:
            log_entry = {
                "timestamp": timestamp,
                "status": "DUPLICATE",
                "identifier": query,
                "roll_no": roll_no,
                "name": matched.get("name", ""),
                "hall_no": matched.get("hall_no", ""),
                "notes": "Duplicate entry attempt detected"
            }
            self.audit_log.append(log_entry)
            return "DUPLICATE", matched, f"Warning: Student {matched['name']} ({roll_no}) already checked in!"

        # Success - first check-in
        self.checked_in_roll_numbers.add(roll_no)
        log_entry = {
            "timestamp": timestamp,
            "status": "AUTHORIZED",
            "identifier": query,
            "roll_no": roll_no,
            "name": matched.get("name", ""),
            "hall_no": matched.get("hall_no", ""),
            "notes": f"Verified via {match_type}"
        }
        self.audit_log.append(log_entry)
        return "SUCCESS", matched, f"Verified via {match_type}"

    def export_audit_log(self, target_path):
        """Exports session audit log to CSV."""
        if not self.audit_log:
            return False, "No audit logs recorded in current session."

        try:
            fieldnames = ["timestamp", "status", "identifier", "roll_no", "name", "hall_no", "notes"]
            with open(target_path, mode="w", newline="", encoding="utf-8") as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(self.audit_log)
            return True, f"Exported {len(self.audit_log)} log entries to {target_path}"
        except Exception as e:
            return False, f"Failed to export log: {str(e)}"


# ==========================================
# Tkinter Modern GUI Interface
# ==========================================
if TK_AVAILABLE:
    class GuidExGUI(tk.Tk):
        def __init__(self, db):
            super().__init__()
            self.db = db
            self.title("GuidEx — Smart Exam Hall Guidance System | Sujaya K S")
            self.geometry("1100x720")
            self.minsize(980, 650)
            self.configure(bg="#0f172a")

            self._init_styles()
            self._build_ui()
            self._update_clock()

        def _init_styles(self):
            self.colors = {
                "bg_dark": "#0f172a",
                "bg_card": "#1e293b",
                "bg_card_hover": "#334155",
                "text_primary": "#f8fafc",
                "text_muted": "#94a3b8",
                "accent_blue": "#38bdf8",
                "accent_emerald": "#10b981",
                "accent_rose": "#f43f5e",
                "accent_amber": "#f59e0b",
                "border": "#334155"
            }

        def _build_ui(self):
            # Top App Bar
            top_bar = tk.Frame(self, bg="#1e293b", height=70, padx=20, pady=12)
            top_bar.pack(side=tk.TOP, fill=tk.X)

            brand_frame = tk.Frame(top_bar, bg="#1e293b")
            brand_frame.pack(side=tk.LEFT)

            title_lbl = tk.Label(
                brand_frame,
                text="GuidEx 2.0",
                font=("Segoe UI", 18, "bold"),
                fg=self.colors["accent_blue"],
                bg="#1e293b"
            )
            title_lbl.pack(side=tk.LEFT)

            sub_lbl = tk.Label(
                brand_frame,
                text="  |  Smart Exam Hall Guidance & Authentication",
                font=("Segoe UI", 12),
                fg=self.colors["text_muted"],
                bg="#1e293b"
            )
            sub_lbl.pack(side=tk.LEFT)

            # Live Clock & Status
            status_frame = tk.Frame(top_bar, bg="#1e293b")
            status_frame.pack(side=tk.RIGHT)

            self.clock_lbl = tk.Label(
                status_frame,
                text="--:--:--",
                font=("Consolas", 12, "bold"),
                fg=self.colors["text_primary"],
                bg="#1e293b"
            )
            self.clock_lbl.pack(side=tk.LEFT, padx=15)

            system_badge = tk.Label(
                status_frame,
                text="● SYSTEM READY",
                font=("Segoe UI", 9, "bold"),
                fg=self.colors["accent_emerald"],
                bg="#064e3b",
                padx=8,
                pady=4
            )
            system_badge.pack(side=tk.RIGHT)

            # Main Body Grid
            main_frame = tk.Frame(self, bg=self.colors["bg_dark"], padx=16, pady=16)
            main_frame.pack(fill=tk.BOTH, expand=True)

            # Left Panel: Scanner Controls & Fast Test Simulator
            left_panel = tk.Frame(main_frame, bg=self.colors["bg_card"], width=320, padx=16, pady=16, relief=tk.FLAT)
            left_panel.pack(side=tk.LEFT, fill=tk.Y, padx=(0, 12))
            left_panel.pack_propagate(False)

            tk.Label(
                left_panel,
                text="SCANNER INTERFACE",
                font=("Segoe UI", 11, "bold"),
                fg=self.colors["accent_blue"],
                bg=self.colors["bg_card"]
            ).pack(anchor="w", pady=(0, 10))

            tk.Label(
                left_panel,
                text="Enter RFID Tag / Biometric / Roll No:",
                font=("Segoe UI", 9),
                fg=self.colors["text_muted"],
                bg=self.colors["bg_card"]
            ).pack(anchor="w", pady=(0, 4))

            self.input_entry = tk.Entry(
                left_panel,
                font=("Segoe UI", 11),
                bg="#0f172a",
                fg=self.colors["text_primary"],
                insertbackground="#38bdf8",
                relief=tk.FLAT,
                bd=6
            )
            self.input_entry.pack(fill=tk.X, pady=(0, 8))
            self.input_entry.bind("<Return>", lambda e: self.handle_scan())

            scan_btn = tk.Button(
                left_panel,
                text="⚡ Authenticate Credential",
                font=("Segoe UI", 10, "bold"),
                bg=self.colors["accent_blue"],
                fg="#0f172a",
                activebackground="#0284c7",
                relief=tk.FLAT,
                cursor="hand2",
                command=self.handle_scan,
                pady=6
            )
            scan_btn.pack(fill=tk.X, pady=(0, 16))

            # Fast Simulation Buttons
            tk.Label(
                left_panel,
                text="QUICK SIMULATOR PRESETS",
                font=("Segoe UI", 10, "bold"),
                fg=self.colors["text_muted"],
                bg=self.colors["bg_card"]
            ).pack(anchor="w", pady=(0, 8))

            presets = [
                ("Sujaya K S (ECE - Hall A-102)", "RFID_9A8B7C"),
                ("Aravind S (ECE - Hall A-102)", "FP_102"),
                ("Dinesh Kumar (CSE - Hall B-204)", "7377211CS201"),
                ("Kavya Murugan (IT - Hall C-301)", "RFID_5A6B7C"),
                ("Simulate Unknown / Invalid Card", "RFID_UNKNOWN_99")
            ]

            for label_txt, token_val in presets:
                btn = tk.Button(
                    left_panel,
                    text=label_txt,
                    font=("Segoe UI", 9),
                    bg="#334155",
                    fg=self.colors["text_primary"],
                    activebackground="#475569",
                    relief=tk.FLAT,
                    cursor="hand2",
                    command=lambda t=token_val: self.run_preset(t),
                    anchor="w",
                    padx=10,
                    pady=4
                )
                btn.pack(fill=tk.X, pady=3)

            # Database stats in left panel
            stats_box = tk.Frame(left_panel, bg="#0f172a", padx=10, pady=10)
            stats_box.pack(side=tk.BOTTOM, fill=tk.X)
            self.db_stat_lbl = tk.Label(
                stats_box,
                text=f"Records: {len(self.db.students)} students\nChecked-in: 0 students",
                font=("Segoe UI", 8),
                fg=self.colors["text_muted"],
                bg="#0f172a",
                justify="left"
            )
            self.db_stat_lbl.pack(anchor="w")

            # Center Panel: Real-time Guidance & Verification Card
            center_panel = tk.Frame(main_frame, bg=self.colors["bg_dark"])
            center_panel.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

            # Verification Status Banner
            self.status_banner = tk.Label(
                center_panel,
                text="WAITING FOR STUDENT SCAN...",
                font=("Segoe UI", 13, "bold"),
                fg="#94a3b8",
                bg="#1e293b",
                pady=14
            )
            self.status_banner.pack(fill=tk.X, pady=(0, 12))

            # Student Info & Allocation Grid
            self.card_frame = tk.Frame(center_panel, bg=self.colors["bg_card"], padx=20, pady=20)
            self.card_frame.pack(fill=tk.BOTH, expand=True)

            # Left side of card: Student Details
            student_info_frame = tk.Frame(self.card_frame, bg=self.colors["bg_card"])
            student_info_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

            self.info_name = self._add_info_row(student_info_frame, "STUDENT NAME:", "—", font_size=14, bold=True)
            self.info_roll = self._add_info_row(student_info_frame, "ROLL NUMBER:", "—")
            self.info_dept = self._add_info_row(student_info_frame, "DEPARTMENT:", "—")
            self.info_exam = self._add_info_row(student_info_frame, "EXAMINATION:", "—")
            self.info_time = self._add_info_row(student_info_frame, "REPORTING TIME:", "—")

            # Right side of card: Big Hall & Desk Badges + Mini Seat Map
            guidance_box = tk.Frame(self.card_frame, bg="#0f172a", padx=16, pady=16, width=280)
            guidance_box.pack(side=tk.RIGHT, fill=tk.Y, padx=(12, 0))
            guidance_box.pack_propagate(False)

            tk.Label(
                guidance_box,
                text="ALLOCATED EXAMINATION HALL",
                font=("Segoe UI", 8, "bold"),
                fg=self.colors["text_muted"],
                bg="#0f172a"
            ).pack(anchor="w")

            self.hall_badge = tk.Label(
                guidance_box,
                text="HALL --",
                font=("Segoe UI", 16, "bold"),
                fg=self.colors["accent_blue"],
                bg="#0f172a"
            )
            self.hall_badge.pack(anchor="w", pady=(2, 6))

            self.floor_badge = tk.Label(
                guidance_box,
                text="Floor: --",
                font=("Segoe UI", 10),
                fg=self.colors["text_primary"],
                bg="#0f172a"
            )
            self.floor_badge.pack(anchor="w")

            self.desk_badge = tk.Label(
                guidance_box,
                text="Desk: --",
                font=("Segoe UI", 13, "bold"),
                fg=self.colors["accent_emerald"],
                bg="#0f172a"
            )
            self.desk_badge.pack(anchor="w", pady=(4, 10))

            tk.Label(
                guidance_box,
                text="SEATING DESK MAP (GRID)",
                font=("Segoe UI", 8, "bold"),
                fg=self.colors["text_muted"],
                bg="#0f172a"
            ).pack(anchor="w", pady=(8, 4))

            # Seat Matrix Canvas
            self.seat_canvas = tk.Canvas(guidance_box, bg="#1e293b", height=130, highlightthickness=0)
            self.seat_canvas.pack(fill=tk.X, pady=(2, 0))
            self._draw_seat_matrix(None)

            # Bottom: Audit Log Viewer
            log_frame = tk.Frame(self, bg=self.colors["bg_card"], height=160, padx=16, pady=10)
            log_frame.pack(side=tk.BOTTOM, fill=tk.X, padx=16, pady=(0, 16))

            log_header = tk.Frame(log_frame, bg=self.colors["bg_card"])
            log_header.pack(fill=tk.X, pady=(0, 6))

            tk.Label(
                log_header,
                text="VERIFICATION AUDIT LOG (SESSION)",
                font=("Segoe UI", 10, "bold"),
                fg=self.colors["text_muted"],
                bg=self.colors["bg_card"]
            ).pack(side=tk.LEFT)

            export_btn = tk.Button(
                log_header,
                text="📥 Export CSV Log",
                font=("Segoe UI", 9),
                bg="#334155",
                fg=self.colors["text_primary"],
                relief=tk.FLAT,
                cursor="hand2",
                command=self.export_log_file,
                padx=8,
                pady=2
            )
            export_btn.pack(side=tk.RIGHT)

            self.log_text = tk.Text(
                log_frame,
                height=5,
                bg="#0f172a",
                fg="#cbd5e1",
                font=("Consolas", 9),
                relief=tk.FLAT,
                state=tk.DISABLED
            )
            self.log_text.pack(fill=tk.BOTH, expand=True)

        def _add_info_row(self, parent, label_text, default_val, font_size=11, bold=False):
            row = tk.Frame(parent, bg=self.colors["bg_card"])
            row.pack(anchor="w", fill=tk.X, pady=4)

            tk.Label(
                row,
                text=label_text,
                font=("Segoe UI", 9, "bold"),
                fg=self.colors["text_muted"],
                bg=self.colors["bg_card"],
                width=18,
                anchor="w"
            ).pack(side=tk.LEFT)

            weight = "bold" if bold else "normal"
            val_lbl = tk.Label(
                row,
                text=default_val,
                font=("Segoe UI", font_size, weight),
                fg=self.colors["text_primary"],
                bg=self.colors["bg_card"],
                anchor="w"
            )
            val_lbl.pack(side=tk.LEFT)
            return val_lbl

        def _draw_seat_matrix(self, highlight_desk):
            self.seat_canvas.delete("all")
            cols, rows = 6, 3
            cell_w, cell_h = 36, 30
            pad_x, pad_y = 10, 10

            desk_counter = 1
            for r in range(rows):
                for c in range(cols):
                    desk_id = f"D-{desk_counter:02d}"
                    x1 = pad_x + c * (cell_w + 4)
                    y1 = pad_y + r * (cell_h + 4)
                    x2 = x1 + cell_w
                    y2 = y1 + cell_h

                    if highlight_desk and desk_id.lower() == highlight_desk.lower():
                        fill_color = "#10b981"  # Emerald Green for current student
                        text_color = "#0f172a"
                    else:
                        fill_color = "#334155"
                        text_color = "#94a3b8"

                    self.seat_canvas.create_rectangle(x1, y1, x2, y2, fill=fill_color, outline="", width=0)
                    self.seat_canvas.create_text(
                        (x1 + x2) / 2, (y1 + y2) / 2,
                        text=desk_id,
                        fill=text_color,
                        font=("Segoe UI", 7, "bold")
                    )
                    desk_counter += 1

        def _update_clock(self):
            now_str = datetime.now().strftime("%I:%M:%S %p")
            self.clock_lbl.config(text=now_str)
            self.after(1000, self._update_clock)

        def run_preset(self, token):
            self.input_entry.delete(0, tk.END)
            self.input_entry.insert(0, token)
            self.handle_scan()

        def handle_scan(self):
            token = self.input_entry.get().strip()
            if not token:
                return

            status, student, msg = self.db.verify(token)
            timestamp = datetime.now().strftime("%H:%M:%S")

            if status == "SUCCESS":
                self.status_banner.config(
                    text=f"✔ ACCESS GRANTED — HALL ALLOCATED",
                    bg="#064e3b",
                    fg="#34d399"
                )
                self.info_name.config(text=student["name"], fg=self.colors["accent_blue"])
                self.info_roll.config(text=student["roll_no"])
                self.info_dept.config(text=student["department"])
                self.info_exam.config(text=f"{student['exam_code']} — {student['exam_name']}")
                self.info_time.config(text=student["reporting_time"])

                self.hall_badge.config(text=student["hall_no"], fg=self.colors["accent_blue"])
                self.floor_badge.config(text=f"Floor: {student['floor']}")
                self.desk_badge.config(text=f"Desk: {student['desk_no']}", fg=self.colors["accent_emerald"])

                self._draw_seat_matrix(student["desk_no"])
                self._append_log(f"[{timestamp}] SUCCESS: {student['name']} ({student['roll_no']}) -> {student['hall_no']}, {student['desk_no']}")

            elif status == "DUPLICATE":
                self.status_banner.config(
                    text=f"⚠ ALREADY CHECKED IN — DUPLICATE SCAN DETECTED",
                    bg="#78350f",
                    fg="#fbbf24"
                )
                self.info_name.config(text=student["name"], fg="#fbbf24")
                self.info_roll.config(text=student["roll_no"])
                self.info_dept.config(text=student["department"])
                self.info_exam.config(text=f"{student['exam_code']} — {student['exam_name']}")
                self.info_time.config(text=student["reporting_time"])

                self.hall_badge.config(text=student["hall_no"], fg="#fbbf24")
                self.floor_badge.config(text=f"Floor: {student['floor']}")
                self.desk_badge.config(text=f"Desk: {student['desk_no']}", fg="#fbbf24")

                self._draw_seat_matrix(student["desk_no"])
                self._append_log(f"[{timestamp}] DUPLICATE: {student['name']} scanned again ({student['roll_no']})")

            else:
                self.status_banner.config(
                    text="✖ ACCESS DENIED — UNREGISTERED CREDENTIAL",
                    bg="#881337",
                    fg="#f43f5e"
                )
                self.info_name.config(text="Unknown Credential", fg="#f43f5e")
                self.info_roll.config(text="N/A")
                self.info_dept.config(text="N/A")
                self.info_exam.config(text="N/A")
                self.info_time.config(text="N/A")

                self.hall_badge.config(text="N/A", fg="#f43f5e")
                self.floor_badge.config(text="Floor: N/A")
                self.desk_badge.config(text="Desk: N/A", fg="#f43f5e")

                self._draw_seat_matrix(None)
                self._append_log(f"[{timestamp}] DENIED: Unregistered credential '{token}'")

            # Update database checked-in stats
            checked_in_count = len(self.db.checked_in_roll_numbers)
            total_count = len(self.db.students)
            self.db_stat_lbl.config(
                text=f"Records: {total_count} students\nChecked-in: {checked_in_count} / {total_count} students"
            )
            self.input_entry.delete(0, tk.END)

        def _append_log(self, log_str):
            self.log_text.config(state=tk.NORMAL)
            self.log_text.insert(tk.END, log_str + "\n")
            self.log_text.see(tk.END)
            self.log_text.config(state=tk.DISABLED)

        def export_log_file(self):
            target = filedialog.asksaveasfilename(
                defaultextension=".csv",
                filetypes=[("CSV files", "*.csv"), ("All Files", "*.*")],
                initialfile="guidex_audit_log.csv"
            )
            if target:
                success, msg = self.db.export_audit_log(target)
                if success:
                    messagebox.showinfo("Export Successful", msg)
                else:
                    messagebox.showerror("Export Failed", msg)


# ==========================================
# CLI / Automated Testing Interface
# ==========================================
def run_cli_simulation(db):
    """Runs a simulated batch verification in terminal for automated test pipelines."""
    print("=" * 65)
    print("GuidEx Smart Exam Hall Guidance System — Simulation Mode")
    print(f"Database loaded with {len(db.students)} students.")
    print("=" * 65)

    test_tokens = [
        ("RFID_9A8B7C", "Sujaya K S (RFID Tap)"),
        ("FP_102", "Aravind S (Biometric Scan)"),
        ("7377211CS201", "Dinesh Kumar (Roll No Search)"),
        ("RFID_9A8B7C", "Sujaya K S (Duplicate Scan Test)"),
        ("RFID_INVALID_TOKEN", "Unknown Student Token")
    ]

    for token, desc in test_tokens:
        status, student, msg = db.verify(token)
        print(f"\n[SCAN] Input: {token} ({desc})")
        print(f"       Result : {status} -> {msg}")
        if student:
            print(f"       Hall   : {student['hall_no']} | Floor: {student['floor']} | Desk: {student['desk_no']}")
        print("-" * 50)

    # Test export
    export_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "audit_logs_export.csv")
    success, msg = db.export_audit_log(export_path)
    print(f"\n[AUDIT LOG] {msg}")
    print("=" * 65)
    return True


def main():
    parser = argparse.ArgumentParser(description="GuidEx — Smart Exam Hall Guidance System")
    parser.add_argument("--cli", action="store_true", help="Run in terminal CLI mode without GUI")
    parser.add_argument("--simulate", action="store_true", help="Run automated test simulation")
    args = parser.parse_args()

    db = GuidExDatabase()

    if args.cli or args.simulate or not TK_AVAILABLE:
        if not TK_AVAILABLE and not args.cli:
            print("Note: Tkinter not available in current environment; falling back to CLI simulation mode.")
        run_cli_simulation(db)
    else:
        app = GuidExGUI(db)
        app.mainloop()


if __name__ == "__main__":
    main()
