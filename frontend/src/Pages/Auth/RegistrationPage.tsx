import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../deprecateded/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Stack,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from "@mui/material";
import { motion } from "framer-motion";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  skills: string;
};

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("Applicant");
  const [affilation, setAffiliation] = useState("nc-state-dining");
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      skills: "",
    },
  });

  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    console.log("form submitted");
    console.log(data);
    setLoading(true);
    await signup(
      data.email,
      data.password,
      data.confirmPassword,
      data.name,
      role,
      role === "Manager" ? affilation : "",
      data.skills,
      navigate
    );
    setLoading(false);
  };

  return (
    <>
      <div className="mx-auto bg-slate-50 content flex flex-col justify-center items-center overflow-hidden min-h-screen">
        <div className=" p-4  border rounded-lg bg-white py-4">
          <div className="text-xl justify-center text-black mb-4 ">
            Create New Account
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2} width={400}>
              <TextField
                label="Name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{
                  "& label": { paddingLeft: (theme) => theme.spacing(1) },
                  "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                  "& fieldset": {
                    paddingLeft: (theme) => theme.spacing(1.5),
                    borderRadius: "10px",
                  },
                }}
              />

              <TextField
                label="Email Id"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter a valid email",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  "& label": { paddingLeft: (theme) => theme.spacing(1) },
                  "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                  "& fieldset": {
                    paddingLeft: (theme) => theme.spacing(1.5),
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  "& label": {
                    paddingLeft: (theme) => theme.spacing(1),
                  },
                  "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                  "& fieldset": {
                    paddingLeft: (theme) => theme.spacing(1.5),
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                label="Confirm password"
                type="password"
                {...register("confirmPassword", {
                  required: "Password is required",
                  validate: (val: string) => {
                    if (watch("password") !== val) {
                      return "Passwords don't match";
                    }
                  },
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{
                  "& label": {
                    paddingLeft: (theme) => theme.spacing(1),
                  },
                  "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                  "& fieldset": {
                    paddingLeft: (theme) => theme.spacing(1.5),
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                label="Skills"
                type="text"
                {...register("skills", {
                  required: "Skills is required",
                })}
                error={!!errors.skills}
                helperText={errors.skills?.message}
                sx={{
                  "& label": {
                    paddingLeft: (theme) => theme.spacing(1),
                  },
                  "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                  "& fieldset": {
                    paddingLeft: (theme) => theme.spacing(1.5),
                    borderRadius: "10px",
                  },
                }}
              />
              <FormControl>
                <InputLabel id="role-id">Role</InputLabel>
                <Select
                  value={role}
                  labelId="role-id"
                  label="Role"
                  id="role"
                  onChange={(e: SelectChangeEvent) => {
                    setRole(e.target.value);
                  }}
                >
                  <MenuItem value={"Manager"}>Manager</MenuItem>
                  <MenuItem value={"Applicant"}>Applicant</MenuItem>
                </Select>
              </FormControl>
              {role === "Manager" && (
                <FormControl>
                  <InputLabel id="affiliation-id">Role</InputLabel>
                  <Select
                    value={affilation}
                    labelId="affiliation-id"
                    label="Role"
                    id="role"
                    onChange={(e: SelectChangeEvent) => {
                      setAffiliation(e.target.value);
                    }}
                  >
                    <MenuItem value={"nc-state-dining"}>
                      NC State Dining
                    </MenuItem>
                    <MenuItem value={"campus-enterprises"}>
                      Campus Enterprises
                    </MenuItem>
                    <MenuItem value={"wolfpack-outfitters"}>
                      Wolfpack Outfitters
                    </MenuItem>
                  </Select>
                </FormControl>
              )}

              <motion.button
                type="submit"
                className="w-full px-4 py-2  transform transition-transform duration-200 hover:scale-105 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
                whileTap={{
                  scale: 0.8,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  },
                }}
                style={{
                  background: "#FF5353",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                }}
              >
                <div className="flex items-center justify-center flex-row gap-x-4">
                  {loading && (
                    <>
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-6 h-6 text-gray-100 animate-spin dark:text-red-600 fill-red-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </>
                  )}
                  Sign up
                </div>
              </motion.button>
            </Stack>
          </form>
          <div className="mx-auto"></div>
          <br />
          <div className="mv-1 border-t mx-16" />
          <div className="flex justify-center">
            <p className="-mt-3 bg-white px-3 text-[#CCCCCC]">OR</p>
          </div>
          <br />
          <p className="text-center ">
            Already have an Account?
            <span>
              <Link className="cursor-pointer text-red-600" to={"/login"}>
                {" "}
                Login Here
              </Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
