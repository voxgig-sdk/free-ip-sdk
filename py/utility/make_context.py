# FreeIp SDK utility: make_context

from core.context import FreeIpContext


def make_context_util(ctxmap, basectx):
    return FreeIpContext(ctxmap, basectx)
