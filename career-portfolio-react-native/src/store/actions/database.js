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
      const message = "Something went wrong!";
      throw new Error(message);
    }

    const responseData = await response.json();
    // await sendDB(responseData);
    dispatch({ type: POST_RESULT, result: responseData });
    return responseData;
  };
};

const sendDB = async (res) => {
  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(res),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    const message = "Something went wrong!";
    throw new Error(message);
  }

  const responseData = await response.json();
  console.log(responseData);
};
