import React, { useEffect, useState } from "react";
import "./AdminStyle/Modifyfaq.css";
import { useAdminDataContext } from "./AdminProvider";
import { GlobalStyle } from "../styles/GlobalStyle";
import { useNavigate } from "react-router-dom";
import { UseFaqValue } from "./FaqProvider";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
const ModifyFaq = () => {
  const navigate = useNavigate();
  const { FaqArray, SetFaqArray } = UseFaqValue();
  const { adminData } = useAdminDataContext();
  const [Active, SetActive] = useState(undefined);
  const [FaqBox, SetFaqBox] = useState({
    id: "",
    question: "",
    answer: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    SetFaqBox((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleEdit = (Index, QuestionValue, AnswerValue) => {
    SetFaqBox({
      question: QuestionValue,
      answer: AnswerValue,
    });
    SetActive(Index);
  };
  const handleSubmit = (Index) => {
    const doc = axios.patch("http://localhost:8000/faq/modifyfaq", {
      Index,
      adminData,
      FaqBox,
    });
    doc
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    SetActive(undefined);
  };
  const handleDelete = (Index) => {
    const doc = axios.delete(
      `http://localhost:8000/faq/deletefaq/${Index}/${adminData.token}`
    );
    doc
      .then((response) => {
        // console.log(response);
        alert(response.data.message);
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        // console.log(err);
        alert(err.response.data.message);
        navigate("/admin/dashboard");
      });
  };
  // useEffect(() => {
  //   sessionStorage.setItem("token", adminData.token);
  // });
  // console.log(adminData);
  return (
    <>
      <GlobalStyle />
      {adminData.token ? (
        <section className="modify_faq__section">
          <div className="modify_faq__container">
            <div className="modify_faq__content">
              <div className="modify_faq__content__top_part">
                <h1>Modify FAQs</h1>
                <button>
                  <AddIcon />
                  Add new FAQ
                </button>
              </div>
              <div className="modify_faq__content__body">
                {FaqArray.map((items, index) => {
                  return (
                    <>
                      <div key={items._id} className="modify_faq_box">
                        {Active === index ? (
                          <input
                            type="text"
                            name="question"
                            className="input__box__faq"
                            value={FaqBox.question}
                            onChange={handleChange}
                          />
                        ) : (
                          <h1 className="modify_faq_box__question">
                            {items.question}
                          </h1>
                        )}

                        {Active === index ? (
                          <textarea
                            type="text"
                            name="answer"
                            className="textarea__answer_box"
                            value={FaqBox.answer}
                            onChange={handleChange}
                          />
                        ) : (
                          <p className="modify_faq_box__answer">
                            {" "}
                            {items.answer}
                          </p>
                        )}
                        {Active == index ? (
                          <div className="modify_faq__choices">
                            <button
                              className="modify_faq__submit-btn"
                              onClick={() => {
                                handleSubmit(items._id);
                              }}
                            >
                              Submit
                            </button>
                          </div>
                        ) : (
                          <div className="modify_faq__choices">
                            <button
                              className="modify_faq__edit-btn"
                              onClick={(e) => {
                                handleEdit(index, items.question, items.answer);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="modify_faq__delete-btn"
                              onClick={() => {
                                handleDelete(items._id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <h1>Unauthorised access</h1>
      )}
    </>
  );
};

export default ModifyFaq;
