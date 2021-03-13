import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import { InertiaLink } from "@inertiajs/inertia-react";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import { Inertia } from "@inertiajs/inertia";

import swal from 'sweetalert';
const Users = ({ users, user }) => {
    console.log('user login', user)
    console.log(users);
    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                Inertia.delete(route('users.destroy', id ), {
                    onSuccess: () => {
                        swal("Alhamdulilah data terhapus");
                      },
                  })
            } 
          });
    }
    return (
        <React.Fragment>
            <Helmet>
                <title>Users</title>
            </Helmet>
            <div className="">
                <header className="flex justify-between items-center mb-2 ">
                    <h3 className="text-2xl font-bold  ">List Users</h3>
                    <InertiaLink
                        className="border flex bg-blue-500 text-white text-md font-semibold rounded-xl py-2 px-4 mt-2"
                        href={route("users.create")}
                    >
                        Create User
                    </InertiaLink>
                </header>
                c
                <div className="shadow overflow-hidden border border-gray-200 sm:rounded-lg">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    No
                                </th>
                                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nama
                                </th>
                                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>

                                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-xs divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td className="px-2 text-center py-4 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="px-2 py-4 text-center whitespace-nowrap">
                                        <SimpleReactLightbox>
                                            <SRLWrapper>
                                                <img
                                                    className="w-16 h-16   rounded-full overflow-hidden"
                                                    src={user.image}
                                                    alt=""
                                                />
                                            </SRLWrapper>
                                        </SimpleReactLightbox>
                                    </td>
                                    <td className="px-2 py-4 whitespace-nowrap">
                                        {user.name}
                                    </td>
                                    <td className="px-2 py-4 whitespace-nowrap">
                                        {user.email}
                                    </td>

                                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex justify-start space-x-1">
                                            <button className="border-2 border-indigo-200 rounded-md p-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    className="h-4 w-4 text-indigo-500"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                            </button>
                                            <InertiaLink
                                            href={route('users.edit', user.id)}
                                                
                                                className="border-2 border-indigo-200 rounded-md p-1"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    className="h-4 w-4 text-gray-500"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                    />
                                                </svg>
                                            </InertiaLink>
                                            <button onClick={handleDelete.bind(this, user.id)} className="border-2 border-red-200 rounded-md p-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    className="h-4 w-4 text-red-500"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {/* More items... */}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
};
Users.layout = (page) => <Layout user={page.props.user} children={page} />;
export default Users;
