package core

type FreeIpError struct {
	IsFreeIpError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewFreeIpError(code string, msg string, ctx *Context) *FreeIpError {
	return &FreeIpError{
		IsFreeIpError: true,
		Sdk:              "FreeIp",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *FreeIpError) Error() string {
	return e.Msg
}
