# FreeIp SDK utility: make_context

from freeip_sdk.core.context import FreeIpContext


def make_context_util(ctxmap, basectx):
    return FreeIpContext(ctxmap, basectx)
