const apiCall = ({url, ...args}) => new Promise((resolve, reject) => {
  //console.log(args.data);
  setTimeout(() => {
    try {
        var userstring = 'email=' + args.data.email + '&password=' + args.data.pass;
        var res = "";
        return fetch(url, {
            method: "POST",
            body: userstring,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
        }).then(function(response) {
            //console.log("response", response);
            return response.json();
        })
        .then(function(result) {
            //console.log(result);
            res = { token: result.data.token };
            resolve(res);
        });
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

export default apiCall

