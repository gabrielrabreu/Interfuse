import unittest

from todo.routers.auth import CurrentUser


class TestCurrentUser(unittest.TestCase):
    def test_init_should_instantiate(self):
        user_id = "user_id"
        user_name = "user_name"
        user_role = "user_role"

        model = CurrentUser(user_id, user_name, user_role)

        self.assertEqual(model.user_id, user_id)
        self.assertEqual(model.user_name, user_name)
        self.assertEqual(model.user_role, user_role)


if __name__ == "__main__":
    unittest.main()
