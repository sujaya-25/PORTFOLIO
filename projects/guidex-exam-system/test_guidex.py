"""
Automated Test Suite for GuidEx Smart Exam Hall Guidance System
Developer: Sujaya K S
"""

import os
import sys
import unittest
import tempfile
import csv

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from app import GuidExDatabase


class TestGuidExDatabase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.db = GuidExDatabase()

    def setUp(self):
        # Reset check-in state before each test
        self.db.checked_in_roll_numbers.clear()
        self.db.audit_log.clear()

    def test_database_loads_records(self):
        """Verify that the student database loaded successfully with records."""
        self.assertGreater(len(self.db.students), 0, "Database should contain at least 1 student")
        sample = self.db.students[0]
        required_keys = ["roll_no", "name", "hall_no", "floor", "desk_no", "rfid_tag", "fingerprint_id"]
        for key in required_keys:
            self.assertIn(key, sample, f"Key '{key}' must exist in student record")

    def test_verify_by_rfid(self):
        """Verify authentication via valid RFID tag."""
        status, student, msg = self.db.verify("RFID_9A8B7C")
        self.assertEqual(status, "SUCCESS")
        self.assertIsNotNone(student)
        self.assertEqual(student["name"], "Sujaya K S")
        self.assertEqual(student["hall_no"], "Hall A-102")
        self.assertEqual(student["desk_no"], "D-14")

    def test_verify_by_fingerprint(self):
        """Verify authentication via valid fingerprint ID."""
        status, student, msg = self.db.verify("FP_102")
        self.assertEqual(status, "SUCCESS")
        self.assertIsNotNone(student)
        self.assertEqual(student["name"], "Aravind Swaminathan")
        self.assertEqual(student["hall_no"], "Hall A-102")

    def test_verify_by_roll_number(self):
        """Verify authentication via valid roll number."""
        status, student, msg = self.db.verify("7377211CS201")
        self.assertEqual(status, "SUCCESS")
        self.assertIsNotNone(student)
        self.assertEqual(student["name"], "Dinesh Kumar")
        self.assertEqual(student["hall_no"], "Hall B-204")

    def test_duplicate_check_in(self):
        """Verify duplicate check-ins are detected and flagged."""
        status1, student1, _ = self.db.verify("RFID_9A8B7C")
        self.assertEqual(status1, "SUCCESS")
        self.assertIn(student1["roll_no"], self.db.checked_in_roll_numbers)

        # Second attempt with same student
        status2, student2, msg2 = self.db.verify("RFID_9A8B7C")
        self.assertEqual(status2, "DUPLICATE")
        self.assertIn("already checked in", msg2.lower())

    def test_unregistered_credential(self):
        """Verify that unregistered RFID or fingerprint tokens are rejected."""
        status, student, msg = self.db.verify("RFID_INVALID_XYZ")
        self.assertEqual(status, "NOT_FOUND")
        self.assertIsNone(student)
        self.assertIn("Access Denied", msg)

    def test_empty_query(self):
        """Verify that empty inputs are handled cleanly."""
        status, student, msg = self.db.verify("   ")
        self.assertEqual(status, "EMPTY")
        self.assertIsNone(student)

    def test_audit_log_export(self):
        """Verify session audit logs can be exported to CSV."""
        self.db.verify("RFID_9A8B7C")
        self.db.verify("RFID_UNKNOWN_TOKEN")

        with tempfile.NamedTemporaryFile(suffix=".csv", delete=False) as tmp:
            tmp_path = tmp.name

        try:
            success, msg = self.db.export_audit_log(tmp_path)
            self.assertTrue(success)
            self.assertTrue(os.path.exists(tmp_path))

            with open(tmp_path, "r", encoding="utf-8") as f:
                reader = list(csv.DictReader(f))
                self.assertEqual(len(reader), 2)
                self.assertEqual(reader[0]["status"], "AUTHORIZED")
                self.assertEqual(reader[1]["status"], "DENIED")
        finally:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)


if __name__ == "__main__":
    unittest.main(verbosity=2)
