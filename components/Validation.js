import styles from "./Validation.module.scss";

import React, { useEffect, useState } from "react";
// import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";

//   const data = await fetch("https://swapi.dev/api/planets/");

export default function Validation() {
  const [flip, setFlip] = useState("0deg");
  const [repositories, setRepositories] = useState([]);
  const [selectedRepository, setSelectedRepository] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    github: "andre-savedra",
  });
  const [gituser, setGituser] = useState({});

  useEffect(async () => {
    const response = await fetch(
      `https://api.github.com/users/${formData.github}/repos`
    );
    const data = await response.json();
    setRepositories(data);

    const response2 = await fetch(
      `https://api.github.com/users/${formData.github}`
    );
    const data2 = await response2.json();
    setGituser(data2);

    console.log(data);
    console.log(data2);
  }, [formData]);

  useEffect(() => {
    console.log(selectedRepository);
  }, [selectedRepository]);

  function handleForm(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleFlip(event) {
    const flipValue = flip === "0deg" ? "180deg" : "0deg";
    setFlip(flipValue);
  }

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event);

    // setFormData(event.target.value);
    // console.log(formData);
    // setShowMessage(true);

    // reset();
  };

  return (
    <>
      <div className="form-demo">
        <div className="flipbutton">
          <button className="btnflip" onClick={() => handleFlip()}>
            &#10145;
          </button>
        </div>
        <div className="card-inner">
          <div className="card-front">
            <Dialog
              visible={showMessage}
              onHide={() => setShowMessage(false)}
              position="top"
              footer={dialogFooter}
              showHeader={false}
              breakpoints={{ "960px": "80vw" }}
              style={{ width: "30vw" }}
            >
              <div className="flex align-items-center flex-column pt-6 px-3">
                <i
                  className="pi pi-check-circle"
                  style={{ fontSize: "5rem", color: "var(--green-500)" }}
                ></i>
                <h5>Registration Successful!</h5>
                <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                  Your account is registered under name <b>{formData.name}</b> ;
                  it'll be valid next 30 days without activation. Please check{" "}
                  <b>{formData.email}</b> for activation instructions.
                </p>
              </div>
            </Dialog>

            <div className="flex justify-content-center">
              <div className="card">
                <form onSubmit={onSubmit} className="p-fluid">
                  <div className="field gitImgContainer flex align-items-center justify-content-center border-circle">
                    {formData.github && (
                      <img
                        src={`https://github.com/${formData.github}.png`}
                        alt="GitHub Não Encontrado"
                      />
                    )}
                  </div>

                  {/* name field */}
                  <div className="field">
                    <span className="p-float-label">
                      <InputText
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleForm}
                        autoFocus
                      />
                      <label htmlFor="name">Name*</label>
                    </span>
                  </div>
                  {/* end name field */}

                  {/* email field */}
                  <div className="field">
                    <span className="p-float-label p-input-icon-right">
                      <i className="pi pi-envelope" />
                      <InputText
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleForm}
                      />
                      <label htmlFor="email">Email*</label>
                    </span>
                  </div>
                  {/* end email field */}

                  {/* password field */}
                  <div className="field">
                    <span className="p-float-label">
                      <Password
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleForm}
                        toggleMask
                        header={passwordHeader}
                        footer={passwordFooter}
                      />
                      <label htmlFor="password">Password*</label>
                    </span>
                  </div>
                  {/* end password field */}

                  {/* github field */}
                  <div className="field">
                    <span className="p-float-label">
                      <InputText
                        id="github"
                        name="github"
                        value={formData.github}
                        onChange={handleForm}
                        autoFocus
                      />
                      <label htmlFor="github">Github*</label>
                    </span>
                  </div>
                  {/* end github field */}

                  {/* repositories field */}
                  <div className="field">
                    <span className="p-float-label">
                      <Dropdown
                        id="repositories"
                        name="repositories"
                        value={selectedRepository}
                        onChange={(e) => setSelectedRepository(e.value)}
                        options={repositories}
                        optionLabel="name"
                      />
                      <label htmlFor="repositories">Seus Repositórios</label>
                    </span>
                  </div>
                  {/* end repositories field */}

                  <Button
                    type="submit"
                    label="Salvar"
                    className="mt-2 btnSbmt"
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="card-back">
            <div className="field gitImgContainer flex align-items-center justify-content-center border-circle">
              {formData.github && (
                <img
                  src={`https://github.com/${formData.github}.png`}
                  alt="GitHub Não Encontrado"
                />
              )}
            </div>
            <div className="backName">
              <h4>Nome:</h4> <span>{gituser.name}</span>
            </div>
            <div className="backName">
              <h4>Repositórios:</h4> <span>{gituser.public_repos}</span>
            </div>
            <div className="backName">
              <h4>Usuário desde:</h4> <span>{gituser.created_at}</span>
            </div>
            <div className="backName">
              <h4>Seguidores:</h4> <span>{gituser.followers}</span>
            </div>
            <div className="backName">
              <h4>Seguindo:</h4> <span>{gituser.following}</span>
            </div>
           
          </div>
        </div>
      </div>

      {/* STYLE OF COMPONENT */}
      <style jsx>{`
        .flipbutton {
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
        }

        .btnflip {
          color: white;
          background-color: rgb(158, 27, 27, 0);
          outline: none;
          border: none;
          font-weight: bold;
          font-size: 20px;
          padding: 0px;
          border-radius: 3px;
          margin: 0;
          cursor: pointer;
        }

        .gitImgContainer img {
          width: 150px;
          height: 150px;
          border-radius: 100px;
        }

        .form-demo {
          padding: 15px;
          background-color: red;
          border: none;
          border-radius: 10px;
          background: linear-gradient(
            -50deg,
            #313131,
            #525d69,
            #423434,
            #0a0909
          );
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
          box-shadow: rgb(0 0 0 / 20%) 0px 3px 6px, rgb(0 0 0 / 27%) 0px 3px 6px;

          perspective: 1000px;
        }

        .card-inner {
          position: relative;

          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        /* .form-demo:hover .card-inner:hover {
          transform: rotateY(180deg);
        } */

        .form-demo .card-inner {
          transform: rotateY(${flip});
        }

        .card-front,
        .card-back {
          /* position: absolute; */

          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .card-back .backName {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          margin: 0;
          padding: 0;
        }
        .card-back .backName span {
          margin: 0;
          padding-left: 15px;
        }
        .card-back .backName h4 {
          margin: 5px 0px;
          
        }

        .card-front {
        }

        .card-back {
          /* background-color: red; */
          color: white;
          transform: rotateY(180deg);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .form-demo .card {
          min-width: 450px;
        }
        .form-demo .card form {
          margin-top: 2rem;
        }
        .form-demo .card .field {
          margin-bottom: 1.5rem;
        }
        @media screen and (max-width: 960px) {
          .form-demo .card {
            width: 80%;
          }
        }
        @media screen and (max-width: 640px) {
          .form-demo .card {
            width: 100%;
            min-width: 0;
          }
        }
      `}</style>
    </>
  );
}
