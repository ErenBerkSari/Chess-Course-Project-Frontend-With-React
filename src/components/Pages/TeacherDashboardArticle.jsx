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
      message.success("Article created successfully!");
      form.resetFields();
      setArticleContent([{ type: "text", content: "" }]);
    } catch (error) {
      message.error("An error occurred while creating the article.");
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
        title="Create New Article"
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Basic Lesson Information */}
          <Form.Item
            name="articleName"
            label="Article Name"
            rules={[{ required: true, message: "Article name is required" }]}
          >
            <Input placeholder="e.g., How Vladimir Kramnik Became a Super Grandmaster" />
          </Form.Item>

          <Form.Item name="articleDesc" label="Article Description">
            <TextArea
              rows={4}
              placeholder="Write a detailed description of the article"
            />
          </Form.Item>

          <Form.Item name="articleImage" label="Article Image URL">
            <Input placeholder="Enter the image URL" />
          </Form.Item>

          {/* Lesson Content Sections */}
          <Title level={4}>Article Content</Title>
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
                  Delete
                </Button>
              }
            >
              <Form.Item label="Content Type">
                <Select
                  value={section.type}
                  onChange={(value) =>
                    updateArticleContentSection(index, "type", value)
                  }
                >
                  <Select.Option value="text">Text</Select.Option>
                  <Select.Option value="image">Image</Select.Option>
                </Select>
              </Form.Item>

              {(section.type === "text" || section.type === "image-text") && (
                <Form.Item label="Text Content">
                  <TextArea
                    value={section.content}
                    onChange={(e) =>
                      updateArticleContentSection(
                        index,
                        "content",
                        e.target.value
                      )
                    }
                    placeholder="Enter text content"
                    rows={3}
                  />
                </Form.Item>
              )}

              {(section.type === "image" || section.type === "image-text") && (
                <Form.Item label="Image URL">
                  <Input
                    value={section.url}
                    onChange={(e) =>
                      updateArticleContentSection(index, "url", e.target.value)
                    }
                    placeholder="Enter image URL"
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
            Add Content Section
          </Button>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Article
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default TeacherDashboardArticle;
