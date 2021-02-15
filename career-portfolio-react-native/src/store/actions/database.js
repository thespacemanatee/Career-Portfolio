export const POST_RESULT = "POST_RESULT";

export const postResult = (result) => {
  console.log(result);
  return async (dispatch) => {
    const response = await fetch(
      "https://rjiu5d34rj.execute-api.ap-southeast-1.amazonaws.com/test/post-json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      let message = "Something went wrong!";
      throw new Error(message);
    }

    const responseData = await response.json();
    console.log(responseData);
    dispatch({ type: POST_RESULT, result: responseData });
  };
};
