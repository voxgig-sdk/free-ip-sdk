# FreeIp SDK feature factory

from freeip_sdk.feature.base_feature import FreeIpBaseFeature
from freeip_sdk.feature.ratelimit_feature import FreeIpRatelimitFeature
from freeip_sdk.feature.retry_feature import FreeIpRetryFeature
from freeip_sdk.feature.test_feature import FreeIpTestFeature
from freeip_sdk.feature.timeout_feature import FreeIpTimeoutFeature


_FEATURES = {
    "base": lambda: FreeIpBaseFeature(),
    "ratelimit": lambda: FreeIpRatelimitFeature(),
    "retry": lambda: FreeIpRetryFeature(),
    "test": lambda: FreeIpTestFeature(),
    "timeout": lambda: FreeIpTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
