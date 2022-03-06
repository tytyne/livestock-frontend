export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        return {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "Application/json",
        };
    } else {
        return {};
    }
}
// export default function authHeader() {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.token) {
//         return { Authorization: "Bearer " + user.token };
//     } else {
//         return {};
//     }
// }
