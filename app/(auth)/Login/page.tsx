import { headers } from "next/headers";

import LoginForm from "./_components/LoginForm";

export async function Loginpage() {

  return <LoginForm/>;
}

export default Loginpage;
