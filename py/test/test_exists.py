# ProjectName SDK exists test

import pytest
from freeip_sdk import FreeIpSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FreeIpSDK.test(None, None)
        assert testsdk is not None
