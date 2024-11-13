export const returnMissingParamsResp = () => {
  return new Response(JSON.stringify({ message: "missing params" }), {
    status: 400,
  });
};
