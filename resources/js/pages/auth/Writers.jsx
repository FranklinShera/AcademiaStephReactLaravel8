import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

import axios from "axios";

import AdminLayout from "../../components/auth/AdminLayout";

import { useFormik } from "formik";
import * as Yup from "yup";

import DotLoader from "../../components/DotLoader";
import { InputField } from "../../config/FormElements";

const Writers = () => {
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authUser = useSelector((state) => state.authUser);
    const { loggedInUser, auth } = authUser;

    const [loading, setLoading] = useState(true);

    const [writers, setWriters] = useState([]);

    const Formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            speciality: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Writer Name Cannot Be Less Than 3 Characters")
                .max(32, "Writer Name Cannot be More than 32 Characters")
                .required("Writer Name is Required!"),
            email: Yup.string()
                .email("Enter A Valid Email!")
                .required("Email is Required!"),
            phone: Yup.string()
                .min(10, "Phone Number Cannot Be Less Than 10 Characters")
                .max(12, "Phone Number Cannot be More than 12 Characters")
                .required("Phone Number is Required!"),
            speciality: Yup.string()
                .min(3, "Speciality Cannot Be Less Than 3 Characters")
                .max(32, "Speciality Cannot be More than 32 Characters")
                .required("Speciality is Required!"),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            addWriter(values);

            resetForm();

            setSubmitting(false);
        },
    });

    const addWriter = (formValues) => {
        axios
            .post("/api/auth/admin/add-writer", formValues)
            .then((res) => {
                if (res.status == 201) {
                    window.Toast.fire({
                        icon: "success",
                        title: res.data.message,
                    });

                    fetchWriters();
                } else {
                    window.Toast.fire({
                        icon: "error",
                        title: res.data.message,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });

        closeModal();
    };

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const toggleStatus = (id) => {
        axios
            .post("/api/auth/admin/writer-status-toggle/" + id)
            .then((res) => {
                if (res.status == 200) {
                    window.Toast.fire({
                        icon: "success",
                        title: res.data.message,
                    });

                    fetchWriters();
                } else {
                    window.Swal.fire({
                        icon: "error",
                        title: res.data.message,
                    });
                }
            })
            .catch((error) => {
                window.Swal.fire({
                    icon: "error",
                    title: error,
                });
            });
    };

    const fetchWriters = (writersUrl = "/api/auth/admin/writers") => {
        setLoading(true);

        axios
            .get(writersUrl)
            .then((res) => {
                if (res.status == 200) {
                    setWriters(res.data);
                } else {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        setLoading(false);
    };

    useEffect(() => {
        if (!auth) {
            navigate("/in");
        }

        window.scrollTo(0, 0);

        document.querySelector("title").text = "AcademiaSteph21 | Writers";

        fetchWriters();
    }, [auth]);

    return (
        <div className="dashboard">
            <AdminLayout>
                <div className="dash_overview">
                    <div className="writers">
                        <div className="second-nav">
                            <h1 className="lead-title inline">WRITERS</h1>

                            <button
                                className="px-6 py-2 bg-blue-600 rounded-full text-white"
                                onClick={(e) => {
                                    e.preventDefault();
                                    openModal();
                                }}
                            >
                                Add Writer
                            </button>
                            <div className="second-nav-controls">
                                <span
                                    className={
                                        writers.links?.prev
                                            ? "p-2 cursor-pointer"
                                            : "p-2 text-gray-400"
                                    }
                                    onClick={(e) => {
                                        e.preventDefault();
                                        fetchWriters(writers.links?.prev);
                                    }}
                                >
                                    <i className="ti-angle-left"></i>PREV
                                </span>
                                <span
                                    className={
                                        writers.links?.next
                                            ? "p-2 cursor-pointer ml-4"
                                            : "p-2 text-gray-400 ml-4"
                                    }
                                    onClick={(e) => {
                                        e.preventDefault();
                                        fetchWriters(writers.links?.next);
                                    }}
                                >
                                    NEXT
                                    <i className="ti-angle-right"></i>
                                </span>
                            </div>
                        </div>

                        <div className="writers-label">
                            <div className="writers-name">Name</div>

                            <div className="writers-email">Email</div>

                            <div className="writers-phone">Phone</div>

                            <div className="writers-speciality">Speciality</div>

                            <div className="writers-date">Date</div>

                            <div className="writers-action">
                                <i className="ti-settings h-5 w-5 text-black"></i>
                            </div>
                        </div>

                        <div className="writers-list">
                            <Transition show={isOpen} as={Fragment}>
                                <Dialog
                                    as="div"
                                    className="fixed inset-0 z-10 overflow-y-auto"
                                    onClose={closeModal}
                                >
                                    <div className="min-h-screen px-4 text-center">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                                        </Transition.Child>

                                        {/* This element is to trick the browser into centering the modal contents. */}
                                        <span
                                            className="inline-block h-screen align-middle"
                                            aria-hidden="true"
                                        >
                                            &#8203;
                                        </span>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-2xl font-bold leading-6 text-blue-500"
                                                >
                                                    Add New Writer
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <form
                                                        action=""
                                                        onClick={
                                                            Formik.handleSubmit
                                                        }
                                                    >
                                                        <div className="flex justify-between">
                                                            <InputField
                                                                labelText="Writer Name"
                                                                id="writer-name"
                                                                name="name"
                                                                type="text"
                                                                parentClasses="w-45/100"
                                                                classes=""
                                                                placeholder="Type Writer Name..."
                                                                onBlur={
                                                                    Formik.handleBlur
                                                                }
                                                                onChange={
                                                                    Formik.handleChange
                                                                }
                                                                errors={
                                                                    Formik
                                                                        .errors
                                                                        .name &&
                                                                    Formik
                                                                        .touched
                                                                        .name &&
                                                                    Formik
                                                                        .errors
                                                                        .name
                                                                }
                                                            />

                                                            <InputField
                                                                labelText="Email"
                                                                id="writer-email"
                                                                name="email"
                                                                type="text"
                                                                parentClasses="w-45/100"
                                                                classes=""
                                                                placeholder="Type Writer Email..."
                                                                onBlur={
                                                                    Formik.handleBlur
                                                                }
                                                                onChange={
                                                                    Formik.handleChange
                                                                }
                                                                errors={
                                                                    Formik
                                                                        .errors
                                                                        .email &&
                                                                    Formik
                                                                        .touched
                                                                        .email &&
                                                                    Formik
                                                                        .errors
                                                                        .email
                                                                }
                                                            />
                                                        </div>

                                                        <div className="flex  justify-between">
                                                            <InputField
                                                                labelText="Phone Number"
                                                                id="writer-phone"
                                                                name="phone"
                                                                type="number"
                                                                parentClasses="w-45/100"
                                                                classes=""
                                                                placeholder="e.g 254701234567"
                                                                onBlur={
                                                                    Formik.handleBlur
                                                                }
                                                                onChange={
                                                                    Formik.handleChange
                                                                }
                                                                errors={
                                                                    Formik
                                                                        .errors
                                                                        .phone &&
                                                                    Formik
                                                                        .touched
                                                                        .phone &&
                                                                    Formik
                                                                        .errors
                                                                        .phone
                                                                }
                                                            />

                                                            <InputField
                                                                labelText="Speciality"
                                                                id="writer-speciality"
                                                                name="speciality"
                                                                type="text"
                                                                parentClasses="w-45/100"
                                                                classes=""
                                                                placeholder="Type Writer Speciality..."
                                                                onBlur={
                                                                    Formik.handleBlur
                                                                }
                                                                onChange={
                                                                    Formik.handleChange
                                                                }
                                                                errors={
                                                                    Formik
                                                                        .errors
                                                                        .speciality &&
                                                                    Formik
                                                                        .touched
                                                                        .speciality &&
                                                                    Formik
                                                                        .errors
                                                                        .speciality
                                                                }
                                                            />
                                                        </div>

                                                        <button
                                                            type="button"
                                                            className="inline-flex justify-center px-6 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                        >
                                                            SAVE
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </Transition.Child>
                                    </div>
                                </Dialog>
                            </Transition>

                            {writers.length != 0 &&
                                !loading &&
                                writers.data.map((writer, index) => (
                                    <div
                                        className="writer"
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        <div className="writers-name">
                                            {index + 1 + "."} {writer.name}
                                        </div>

                                        <div className="writers-email">
                                            {writer.email}
                                        </div>

                                        <div className="writers-phone">
                                            {writer.phone}
                                        </div>

                                        <div className="writers-speciality">
                                            {writer.speciality}
                                        </div>

                                        <div className="writers-date">
                                            {writer.created_at}
                                        </div>

                                        <div className="writers-action border-l-2 border-white">
                                            <i
                                                className={`ti-exchange-vertical cursor-pointer ${
                                                    writer.active
                                                        ? "text-green-600"
                                                        : "text-dark-1"
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleStatus(writer.id);
                                                }}
                                            ></i>
                                        </div>
                                    </div>
                                ))}

                            {loading && <DotLoader />}

                            {writers.length == 0 && !loading && (
                                <>
                                    <div className="no-messages">
                                        <h3>You Don't Have Writers!</h3>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </div>
    );
};

export default Writers;
