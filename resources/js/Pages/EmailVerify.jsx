import React from 'react'
import { Inertia } from "@inertiajs/inertia";
import swal from "sweetalert";
const EmailVerify = (props) => {
    const email = props.user.email
    const [isLoading, setIsLoading] = React.useState(false)
    console.log(props)
    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route("verification.send"), email, {
            onStart : ()=> {
                setIsLoading(true)
            },
            onSuccess: () => {
                setIsLoading(false)
                swal(
                    "Good job!",
                    "Alhamdulilah user berhasil ditambahkan",
                    "success"
                );
            },
        });

    }
    return(
        <React.Fragment>
<div>

</div>
<div>
    <p>Silahkan check email anda untk verifikasi</p>
    <div>
        <form onSubmit={handleSubmit}>
            <button type="submit">{isLoading ? 'Sedang Mengirim ...' : 'Kirim email kembali'}</button>
        </form>
    </div>
</div>
        </React.Fragment>
    )
}

export default EmailVerify