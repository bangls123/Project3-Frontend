import { AuthenticationInput } from './dtos/authenticationInput';
import { AuthenticationResult } from './dtos/authenticationResult';
import { CheckTokenResult } from './dtos/checkTokenResult';
import http from '../../services/httpService';

class LoginService {
    static async authenticate(input: AuthenticationInput): Promise<AuthenticationResult> {
        const rs = await http.post('/services/app/auth/checkLogin', input);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async checkToken(token: string): Promise<CheckTokenResult> {
        const rs = await http.get('/services/app/auth/checkToken');
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }
}

export default LoginService;
