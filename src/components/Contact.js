import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import SchoolIcon from '@mui/icons-material/School';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Tooltip from '@mui/material/Tooltip';
import Footer from "./Footer";

export function Contact() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            message
        };
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Handle successful submission
                alert('Your message has been sent. I will get back to you shortly!');
                setName('');
                setMessage('');
            } else {
                // Handle submission error
                alert('There was an error submitting your message. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your message. Please try again later.');
        }
    };

    const renderButton = (icon, text, to, tooltip) => (
        <Link to={to} className="inline-flex flex-col items-center justify-center text-center">
          <Tooltip title={tooltip}>
            <IconButton color="inherit">
              {icon}
            </IconButton>
          </Tooltip>
          <span className="text-xs text-white">{text}</span>
        </Link>
    );

    return (
        <main className="min-h-screen bg-gray-100"   style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
            <div
                className="bg-blue-400 text-white py-2 px-6 sticky top-0 flex items-center justify-between z-10"
                style={{ backgroundColor: "rgb(4, 125, 149)" }}
            >
                <Link to="/" className="text-2xl font-bold tracking-wider text-white hover:text-gray-300">Divvy</Link>
                <div className="flex items-center space-x-4">
                    {renderButton(<AppsIcon />, "App", "/App/Home", "Go to App")}
                    {renderButton(<SchoolIcon />, "Tutorials", "/Tutorials", "Tutorials")}
                    {renderButton(<ContactMailIcon />, "Contact", "/App/Contact", "Contact Me")}
                </div>
            </div>
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-5">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Support Inquiry</div>
                    <p className="text-gray-700 text-base">
                        Looking to reach me? Fill out the below information and I'll get back to you.
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="px-6 pt-4 pb-2">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-900 text-sm font-bold mb-2">Name:</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-900 text-sm font-bold mb-2">Message:</label>
                            <textarea
                                id="message"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 resize-none"
                                placeholder="Your message"
                                rows="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </main>
    );
}

export default Contact;
