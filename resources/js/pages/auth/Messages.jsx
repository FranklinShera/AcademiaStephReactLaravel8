import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import AdminLayout from "../../components/auth/AdminLayout";

//actions
import { logoutUser } from "../../actions/AuthUserActions";
import Message from "../../components/Message";
import DotLoader from "../../components/DotLoader";
import ChatHolder from "../../components/ChatHolder";
import CreateMessage from "../../components/CreateMessage";

const Messages = () => {
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const routeParams = useParams();

    const authUser = useSelector((state) => state.authUser);
    const { loggedInUser, auth } = authUser;

    const messagesEndRef = useRef(null);

    const [newMsg, setNewMsg] = useState("");
    const [loading, setLoading] = useState(true);

    const [messages, setMessages] = useState([]);
    const [chatSign, setChatSign] = useState("");
    const [clientsName, setClientsName] = useState("");

    const titleCase = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const getSign = () => {
        let sign = loggedInUser.name.split(" ");
        setChatSign(" ^" + sign[0][0] + sign[1][0]);

        let cname = routeParams.clientName.split("-");

        let capName = titleCase(cname[0]) + " " + titleCase(cname[1]);

        setClientsName(capName);
    };

    const fetchMessages = (id) => {
        setLoading(true);
        axios
            .get(`/api/auth/admin/conversation/${id}/messages`)
            .then((res) => {
                if (res.status == 200) {
                    setMessages(res.data.data);

                    scrollToBottom();
                } else {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        setLoading(false);
    };

    const sendMessage = () => {
        if (newMsg === "") {
            window.Swal.fire({
                icon: "error",
                title: "Message Cannot Be Null!",
            });

            return;
        }

        setLoading(true);

        axios
            .post("/api/auth/admin/message", {
                message: newMsg + chatSign,
                conv_id: routeParams.id,
            })
            .then((res) => {
                if (res.status == 201) {
                    window.Toast.fire({
                        icon: "success",
                        title: "Message Sent!",
                    });
                    setNewMsg("");

                    fetchMessages(routeParams.id);
                } else {
                    window.Toast.fire({
                        icon: "error",
                        title: "Message Not Sent!",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!auth) {
            navigate("/in");
        }

        window.scrollTo(0, 0);

        document.querySelector("title").text = "AcademiaSteph21 | Messages";

        fetchMessages(routeParams.id);
        getSign();
    }, [auth]);

    return (
        <div className="dashboard">
            <AdminLayout>
                <div className="dash_overview">
                    <div className="messages">
                        <h1 className="lead-title inline">Messages</h1>
                        <div className="messages-group">
                            <ChatHolder
                                messages={messages}
                                isAdmin={true}
                                clientsName={clientsName}
                                loading={loading}
                                divRef={messagesEndRef}
                            />
                        </div>

                        <CreateMessage
                            setNewMsg={setNewMsg}
                            sendMessage={sendMessage}
                            newMsg={newMsg}
                        />
                    </div>
                </div>
            </AdminLayout>
        </div>
    );
};

export default Messages;
