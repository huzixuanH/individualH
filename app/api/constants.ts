export const returnMissingParamsResp = () => {
  const resp = new Response(JSON.stringify({ message: "missing params" }), {
    status: 401,
  });
};
