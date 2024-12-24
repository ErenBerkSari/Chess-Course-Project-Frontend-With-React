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
import { createArticle } from "../../redux/slices/articleSlice";

const { Title } = Typography;
const { TextArea } = Input;

function TeacherDashboardArticle() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [articleContent, setArticleContent] = useState([
    { type: "text", content: "" },
  ]);

  const handleSubmit = async (values) => {
    try {
      const articleData = {
        ...values,
        articleContent: { sections: articleContent },
      };

      await dispatch(createArticle(articleData));
      message.success("Makale başarıyla oluşturuldu!");
      form.resetFields();
      setArticleContent([{ type: "text", content: "" }]);
    } catch (error) {
      message.error("Makale oluşturulurken bir hata oluştu.");
    }
  };

  const addArticleContentSection = () => {
    setArticleContent([
      ...articleContent,
      { type: "text", content: "", url: "" },
    ]);
  };

  const updateArticleContentSection = (index, field, value) => {
    const newSections = [...articleContent];
    newSections[index][field] = value;
    setArticleContent(newSections);
  };

  const removeArticleContentSection = (index) => {
    const newSections = articleContent.filter((_, i) => i !== index);
    setArticleContent(newSections);
  };

  return (
    <div>
      <Card
        title="Yeni Makale Oluştur"
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Basic Lesson Information */}
          <Form.Item
            name="articleName"
            label="Makale Adı"
            rules={[{ required: true, message: "Makale adı zorunludur" }]}
          >
            <Input
              placeholder="Örn: Vladimir Kramnik Nasıl Süper Büyükusta Oldu
"
            />
          </Form.Item>

          <Form.Item name="articleDesc" label="Makale Açıklaması">
            <TextArea
              rows={4}
              placeholder="Makalenin detaylı açıklamasını yazın"
            />
          </Form.Item>

          <Form.Item name="articleImage" label="Makale Görseli URL">
            <Input placeholder="Görsel URL'sini girin" />
          </Form.Item>

          {/* Lesson Content Sections */}
          <Title level={4}>Makale İçeriği</Title>
          {articleContent.map((section, index) => (
            <Card
              key={index}
              style={{ marginBottom: 16 }}
              extra={
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeArticleContentSection(index)}
                >
                  Sil
                </Button>
              }
            >
              <Form.Item label="İçerik Tipi">
                <Select
                  value={section.type}
                  onChange={(value) =>
                    updateArticleContentSection(index, "type", value)
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
                      updateArticleContentSection(
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

              {(section.type === "image" || section.type === "image-text") && (
                <Form.Item label="Görsel URL">
                  <Input
                    value={section.url}
                    onChange={(e) =>
                      updateArticleContentSection(index, "url", e.target.value)
                    }
                    placeholder="Görsel URL'sini girin"
                  />
                </Form.Item>
              )}
            </Card>
          ))}

          <Button
            type="dashed"
            onClick={addArticleContentSection}
            icon={<PlusOutlined />}
            style={{ marginBottom: 16 }}
          >
            İçerik Bölümü Ekle
          </Button>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Makaleyi Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default TeacherDashboardArticle;
