const sendtoken = (user, statusCode, res)=>{
    // creating the token and sending it to the user stroing it in the cookie
    const token = user.getJWTToken();  // this function will help to generate the token and the function is in user model
    //cookie option
    const options={
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRE * 24 * 60* 60* 1000
        ),
        httpOnly:true  //means the cookie is accessible only through HTTP headers and not through client-side scripts.
    };
    // creating the response
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        token,
        user,
    })
}

export default sendtoken;