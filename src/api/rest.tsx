var baseurl = process.env.BASEURL;

export async function getCaraosel() {
    try{
        const res = await fetch(baseurl + '/api/2/coverimg?type=resident');
        const data = await res.json();
        return data['data'];
    }catch(err){
        console.log('There was an error', err);
    }
    
}
export async function login({user_id, user_pass, user_pass_login}:{user_id:string, user_pass:string, user_pass_login:boolean}) {
    const values = {user_id, user_pass, user_pass_login};
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
        body: JSON.stringify(values),
      };
    let url = baseurl + "/api/1/login";
    if (!user_pass_login) {
        url = baseurl + "/api/1//login/create_onetime";
    }
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
    
}