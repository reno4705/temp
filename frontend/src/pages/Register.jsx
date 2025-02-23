/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        id: "",
        email: "",
        phone: "",
        department: "",
        doj: "",
        role: ""
    });

    const deptartments = ["HR", "Marketing", "Engineering"];

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handlereset = () => {
        setForm({
            name: "",
            id: "",
            email: "",
            phone: "",
            department: "",
            doj: "",
            role: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let lst = {};

        if (!form.name) lst.name = "Name is required";
        if (!form.id) lst.id = "Employee Id is required";
        if (!form.email) lst.email = "Email is required";
        if (!form.phone.match(/^\d{10}$/)) lst.phone = "Phone number must be 10 digits";
        if (!form.department) lst.department = "Department is required";
        if (!form.doj) lst.doj = "Date of Joining is required";
        if (!form.role) lst.role = "Role is required";
        
        setErrors(lst);

        if (Object.keys(lst).length === 0) {
            try {
                const res = await fetch("http://54.82.239.111:8000/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                });
                if (res.ok) {
                    toast.success("Employee regitser successfully", {
                        position: "top-right",
                    });
                    console.log("Employee registered successful");
                    handlereset();
                } else {
                    const data = await res.json();
                    if (data.message == "Employee id already exist") {
                        toast.warning("Employee id already exist", {
                            position: "top-right",
                        });
                        console.log("Employee id already exist");
                    } else if (data.message == "Employee email already exist") {
                        toast.warning("Employee email already exist", {
                            position: "top-right",
                        });
                        console.log("Employee email already exist");
                    }
                }
            } catch (error) {
                toast.error("Error registering employee", {
                    position: "top-right",
                });
                console.log(error);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="input-field"
                />
                {errors.name && <p>{errors.name}</p>}
                <label>Employee Id:</label>
                <input
                    type="text"
                    name="id"
                    value={form.id}
                    onChange={handleChange}
                    className="input-field"
                />
                {errors.id && <p>{errors.id}</p>}

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="input-field"
                />
                {errors.email && <p>{errors.email}</p>}

                <label>Phone Number:</label>
                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="input-field"
                />
                {errors.phone && <p>{errors.phone}</p>}

                <label>Department:</label>
                <select
                    className=""
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                >
                    <option value="" disabled>
                        Select Department
                    </option>
                    {deptartments.map((dept, index) => (
                        <option key={index} value={dept}>
                            {dept}
                        </option>
                    ))}
                </select>
                {errors.department && <p>{errors.department}</p>}

                <label>Date of Joining:</label>
                <input type="date" name="doj" value={form.doj} onChange={handleChange} max={new Date().toISOString().split("T")[0]}/>
                {errors.doj && <p>{errors.doj}</p>}

                <label>Role:</label>
                <input
                    type="text"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="input-field"
                />
                {errors.role && <p>{errors.role}</p>}
                <button type="submit">Submit</button>
            </form>
            <button onClick={handlereset}>Reset</button>
        </div>
    );
};

export default Register;
