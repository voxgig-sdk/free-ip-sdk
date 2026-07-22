# FreeIp SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

FreeIpUtility.registrar = ->(u) {
  u.clean = FreeIpUtilities::Clean
  u.done = FreeIpUtilities::Done
  u.make_error = FreeIpUtilities::MakeError
  u.feature_add = FreeIpUtilities::FeatureAdd
  u.feature_hook = FreeIpUtilities::FeatureHook
  u.feature_init = FreeIpUtilities::FeatureInit
  u.fetcher = FreeIpUtilities::Fetcher
  u.make_fetch_def = FreeIpUtilities::MakeFetchDef
  u.make_context = FreeIpUtilities::MakeContext
  u.make_options = FreeIpUtilities::MakeOptions
  u.make_request = FreeIpUtilities::MakeRequest
  u.make_response = FreeIpUtilities::MakeResponse
  u.make_result = FreeIpUtilities::MakeResult
  u.make_point = FreeIpUtilities::MakePoint
  u.make_spec = FreeIpUtilities::MakeSpec
  u.make_url = FreeIpUtilities::MakeUrl
  u.param = FreeIpUtilities::Param
  u.prepare_auth = FreeIpUtilities::PrepareAuth
  u.prepare_body = FreeIpUtilities::PrepareBody
  u.prepare_headers = FreeIpUtilities::PrepareHeaders
  u.prepare_method = FreeIpUtilities::PrepareMethod
  u.prepare_params = FreeIpUtilities::PrepareParams
  u.prepare_path = FreeIpUtilities::PreparePath
  u.prepare_query = FreeIpUtilities::PrepareQuery
  u.result_basic = FreeIpUtilities::ResultBasic
  u.result_body = FreeIpUtilities::ResultBody
  u.result_headers = FreeIpUtilities::ResultHeaders
  u.transform_request = FreeIpUtilities::TransformRequest
  u.transform_response = FreeIpUtilities::TransformResponse
}
