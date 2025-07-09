import {FC, PropsWithChildren, useState, MouseEvent, useEffect} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Keycloak from 'keycloak-js';
import {authenticate, refreshToken, logout} from "services/AuthService/authService"
import {useNavigate} from 'react-router-dom'

export default function LoginForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handleLogin(event){
        event.preventDefault();
        // Handle form submission logic
        try{
            await authenticate(formData.username, formData.password);
            navigate("/")
        }catch{
            //pass
        }
    };


    // useEffect(() => {
    //     const initOptions = {
    //         url: 'http://localhost:18000/',
    //         realm: 'personalFinanceWebsite',
    //         clientId: 'personalFinanceWebsite',
    //         // grant_type: 'password',
    //         // scope: 'openid',
    //         // client_secret: 'Yv3guRNm2pajM1Oimpacn2D8uZwVDHTE'
    //     }
    //     let kc = new Keycloak(initOptions)
    //     // let kc = new Keycloak('keycloak.json')
    //     kc.init({
    //         onLoad: 'login-required',
    //         checkLoginIFrame: true,
    //         pkceMethod: 'S256'
    //     }).then((auth) => {
    //         if (!auth){
    //             console.log("Not logged in")
    //         }else{
    //             console.info("Auth")
    //             console.log("auth", auth)
    //             console.log("kc", kc)
    //             console.log("token", kc.token)

    //             kc.onTokenExpired = () => {
    //             console.log("token expired")
    //             }

    //         }
    //         }, () => {
    //         console.log("auth failed")
    //         })
    //     }, [])

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: "95vw", /* 512 */
                        height: "95vh", /* 768 */
                    },
                }}
            >
                <Paper sx={{ p: '2px 10px', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                    <form onSubmit={handleLogin}>
                        <Stack direction="column" spacing={8}> 
                        <h1>Personal Finance Website</h1>
                            <Stack direction="column" spacing={2}> 
                                <FormControl variant="standard">
                                    <Stack direction="column" spacing={2}>
                                        <InputLabel shrink htmlFor='username-input'>Username</InputLabel>
                                        <OutlinedInput 
                                            id='username-input'
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                        />
                                    </Stack>
                                </FormControl>
                                <FormControl variant="standard">
                                    <Stack direction="column" spacing={2}>
                                        <InputLabel shrink htmlFor='password-input'>Password</InputLabel>
                                        <OutlinedInput 
                                            id='password-input'
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </Stack>
                                </FormControl>
                                <Button type="submit" variant="contained" color="primary">Login</Button>
                            </Stack>
                        </Stack>
                    </form>

                </Paper>
            </Box>
        </div>
    );
}
