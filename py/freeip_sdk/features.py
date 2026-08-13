# FreeIp SDK feature factory

from freeip_sdk.feature.base_feature import FreeIpBaseFeature
from freeip_sdk.feature.test_feature import FreeIpTestFeature


def _make_feature(name):
    features = {
        "base": lambda: FreeIpBaseFeature(),
        "test": lambda: FreeIpTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
