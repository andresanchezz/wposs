import Swal from "sweetalert2";
async function handleRequest(
    request: any,
    okMessage?: string
) {
    try {
        const response = await request;
        if (okMessage) {
            Swal.fire({
                title: okMessage,
                position: "top-right",
                toast: true,
                background: 'green',
                color: '#fff',
                timer: 3500,
                showConfirmButton: false
            })
        }
        return { data: response.data, error: null };
    } catch (error) {
        Swal.fire({
            title: error.response.data.message,
            position: "top-right",
            toast: true,
            background: 'red',
            color: '#fff',
            timer: 3500,
            showConfirmButton: false
        })
        return { data: null, error: error };
    }
}

export default handleRequest;
