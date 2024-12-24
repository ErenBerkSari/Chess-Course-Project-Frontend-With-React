import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications
import "../../css/AdminDashboardLesson.css";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "../ClipLoader";
import { format } from "date-fns";
import {
  clearLessonState,
  deleteLesson,
  getAllLessons,
} from "../../redux/slices/lessonSlice";
import { useNavigate } from "react-router-dom";
import { createLesson } from "../../redux/slices/lessonSlice";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  message,
  Card,
  Typography,
  Space,
  InputNumber,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;

const AdminDashboardLesson = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [lessonContent, setLessonContent] = useState([
    { type: "text", content: "" },
  ]);
  const [lessonTests, setLessonTests] = useState([
    {
      question: "",
      type: "text",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);

  const handleSubmit = async (values) => {
    try {
      const lessonData = {
        ...values,
        lessonContent: { sections: lessonContent },
        lessonTest: lessonTests.map((test) => ({
          question: test.question,
          options: test.options,
          correctAnswer: test.correctAnswer,
        })),
      };

      await dispatch(createLesson(lessonData));
      message.success("Ders başarıyla oluşturuldu!");
      form.resetFields();
      setLessonContent([{ type: "text", content: "" }]);
      setLessonTests([
        {
          question: "",
          type: "text",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ]);
    } catch (error) {
      message.error("Ders oluşturulurken bir hata oluştu.");
    }
  };

  const addLessonContentSection = () => {
    setLessonContent([
      ...lessonContent,
      { type: "text", content: "", url: "" },
    ]);
  };

  const updateLessonContentSection = (index, field, value) => {
    const newSections = [...lessonContent];
    newSections[index][field] = value;
    setLessonContent(newSections);
  };

  const removeLessonContentSection = (index) => {
    const newSections = lessonContent.filter((_, i) => i !== index);
    setLessonContent(newSections);
  };

  const addLessonTest = () => {
    setLessonTests([
      ...lessonTests,
      {
        question: "",
        type: "text",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const updateLessonTest = (index, field, value) => {
    const newTests = [...lessonTests];
    newTests[index][field] = value;
    setLessonTests(newTests);
  };

  const removeLessonTest = (index) => {
    const newTests = lessonTests.filter((_, i) => i !== index);
    setLessonTests(newTests);
  };
  const { lessons, isLoading } = useSelector((store) => store.lesson);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllLessons());

    return () => {
      dispatch(clearLessonState());
    };
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");

  // Arama fonksiyonu
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Arama terimine göre filtreleme
  const filteredLessons = lessons.filter((lesson) =>
    lesson.lessonName.toLowerCase().includes(searchTerm)
  );

  const handleDelete = async (lessonId) => {
    if (window.confirm("Bu dersi silmek istediğinizden emin misiniz?")) {
      try {
        const result = await dispatch(deleteLesson(lessonId)).unwrap();

        // Optional: Show a success toast
        toast.success("Ders başarıyla silindi");
      } catch (error) {
        // Optional: Show an error toast
        toast.error("Ders silinirken bir hata oluştu");
        console.error("Delete lesson error:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
        }}
      >
        <ClipLoader color="#4caf50" loading={true} size={50} />
        <div>Yükleniyor, lütfen bekleyin...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="container-lg">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Ders <b>Detayları</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <div className="search-box">
                    <div className="input-group">
                      <input
                        type="text"
                        id="search"
                        className="form-control"
                        placeholder="Ders adı.."
                        onChange={handleSearch}
                        value={searchTerm}
                      />
                      <span className="input-group-addon">
                        <i className="material-icons">&#xE8B6;</i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th style={{ width: "22%" }}>Ders Adı</th>
                  <th style={{ width: "22%" }}>Açıklama</th>
                  <th>Tarih</th>
                  <th>Seviye</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredLessons.map((lesson) => (
                  <tr key={lesson._id}>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/lessons/${lesson._id}`)}
                    >
                      <img
                        src={lesson.lessonImage}
                        width={25}
                        style={{ borderRadius: "15px" }}
                      />
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/lessons/${lesson._id}`)}
                    >
                      {lesson.lessonName}
                    </td>
                    <td>{lesson.lessonDesc.substring(0, 25) + "..."}</td>
                    <td>{format(new Date(lesson.createdAt), "dd/MM/yyyy")}</td>
                    <td>{lesson.lessonLevel}</td>
                    <td>
                      <a
                        href="#"
                        className="delete"
                        title="Delete"
                        onClick={() => handleDelete(lesson._id)} // Silme fonksiyonu
                      >
                        <i className="material-icons">&#xE872;</i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <Card
          title="Yeni Ders Oluştur"
          style={{ maxWidth: 800, margin: "0 auto" }}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {/* Basic Lesson Information */}
            <Form.Item
              name="lessonName"
              label="Ders Adı"
              rules={[{ required: true, message: "Ders adı zorunludur" }]}
            >
              <Input placeholder="Örn: Piyonun Hareketleri" />
            </Form.Item>

            <Form.Item name="lessonDesc" label="Ders Açıklaması">
              <TextArea
                rows={4}
                placeholder="Dersin detaylı açıklamasını yazın"
              />
            </Form.Item>

            <Form.Item name="lessonImage" label="Ders Görseli URL">
              <Input placeholder="Görsel URL'sini girin" />
            </Form.Item>

            <Form.Item
              name="lessonLevel"
              label="Ders Seviyesi"
              rules={[{ required: true, message: "Ders seviyesi seçiniz" }]}
            >
              <Select placeholder="Seviye seçin">
                <Select.Option value="Beginner">Başlangıç</Select.Option>
                <Select.Option value="Middle">Orta</Select.Option>
                <Select.Option value="Advanced">İleri</Select.Option>
              </Select>
            </Form.Item>

            {/* Lesson Content Sections */}
            <Title level={4}>Ders İçeriği</Title>
            {lessonContent.map((section, index) => (
              <Card
                key={index}
                style={{ marginBottom: 16 }}
                extra={
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeLessonContentSection(index)}
                  >
                    Sil
                  </Button>
                }
              >
                <Form.Item label="İçerik Tipi">
                  <Select
                    value={section.type}
                    onChange={(value) =>
                      updateLessonContentSection(index, "type", value)
                    }
                  >
                    <Select.Option value="text">Metin</Select.Option>
                    <Select.Option value="image">Görsel</Select.Option>
                    <Select.Option value="image-text">
                      Görsel + Metin
                    </Select.Option>
                  </Select>
                </Form.Item>

                {(section.type === "text" || section.type === "image-text") && (
                  <Form.Item label="Metin İçeriği">
                    <TextArea
                      value={section.content}
                      onChange={(e) =>
                        updateLessonContentSection(
                          index,
                          "content",
                          e.target.value
                        )
                      }
                      placeholder="İçerik metnini girin"
                      rows={3}
                    />
                  </Form.Item>
                )}

                {(section.type === "image" ||
                  section.type === "image-text") && (
                  <Form.Item label="Görsel URL">
                    <Input
                      value={section.url}
                      onChange={(e) =>
                        updateLessonContentSection(index, "url", e.target.value)
                      }
                      placeholder="Görsel URL'sini girin"
                    />
                  </Form.Item>
                )}
              </Card>
            ))}

            <Button
              type="dashed"
              onClick={addLessonContentSection}
              icon={<PlusOutlined />}
              style={{ marginBottom: 16 }}
            >
              İçerik Bölümü Ekle
            </Button>

            {/* Lesson Tests */}
            <Title level={4}>Ders Testleri</Title>
            {lessonTests.map((test, index) => (
              <Card
                key={index}
                style={{ marginBottom: 16 }}
                extra={
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeLessonTest(index)}
                  >
                    Sil
                  </Button>
                }
              >
                <Form.Item label="Soru Tipi">
                  <Select
                    value={test.type}
                    onChange={(value) => updateLessonTest(index, "type", value)}
                  >
                    <Select.Option value="text">Metin</Select.Option>
                    <Select.Option value="image">Görsel</Select.Option>
                    <Select.Option value="image-text">
                      Görsel + Metin
                    </Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Soru">
                  <Input
                    value={test.question}
                    onChange={(e) =>
                      updateLessonTest(index, "question", e.target.value)
                    }
                    placeholder="Soruyu girin"
                  />
                </Form.Item>

                {(test.type === "image" || test.type === "image-text") && (
                  <Form.Item label="Görsel URL">
                    <Input
                      value={test.url}
                      onChange={(e) =>
                        updateLessonTest(index, "url", e.target.value)
                      }
                      placeholder="Görsel URL'sini girin"
                    />
                  </Form.Item>
                )}

                <Form.Item label="Seçenekler">
                  {test.options.map((option, optionIndex) => (
                    <Input
                      key={optionIndex}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...test.options];
                        newOptions[optionIndex] = e.target.value;
                        updateLessonTest(index, "options", newOptions);
                      }}
                      placeholder={`Seçenek ${optionIndex + 1}`}
                      style={{ marginBottom: 8 }}
                    />
                  ))}
                </Form.Item>

                <Form.Item label="Doğru Cevap">
                  <Select
                    value={test.correctAnswer}
                    onChange={(value) =>
                      updateLessonTest(index, "correctAnswer", value)
                    }
                    placeholder="Doğru cevabı seçin"
                  >
                    {test.options.map((option, optionIndex) => (
                      <Select.Option key={optionIndex} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Card>
            ))}

            <Button
              type="dashed"
              onClick={addLessonTest}
              icon={<PlusOutlined />}
              style={{ marginBottom: 16 }}
            >
              Test Sorusu Ekle
            </Button>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Dersi Oluştur
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardLesson;
