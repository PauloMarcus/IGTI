import { signOutEndpoint } from "../../backend";

export default function LogOut(){
    signOutEndpoint().then(() => window.location.reload())
}