import Cookies from 'universal-cookie';

const AuthCheck = () => {
    const cookies = new Cookies();
    // console.log('triggerin auth check');
    const temp = cookies.get('user');
    if(temp){
        return temp;
    }else{
        return null;
    }
}

export default AuthCheck;