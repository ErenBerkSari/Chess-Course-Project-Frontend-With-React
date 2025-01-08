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

function TeacherDashboardLesson() {
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
      message.success("Lesson created successfully!");
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
      message.error("An error occurred while creating the lesson.");
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
  return (
    <div>
      <Card
        title="Create New Lesson"
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Basic Lesson Information */}
          <Form.Item
            name="lessonName"
            label="Lesson Name"
            rules={[{ required: true, message: "Lesson name is required" }]}
          >
            <Input placeholder="E.g., Pawn Moves" />
          </Form.Item>

          <Form.Item name="lessonDesc" label="Lesson Description">
            <TextArea
              rows={4}
              placeholder="Write a detailed description of the lesson"
            />
          </Form.Item>

          <Form.Item name="lessonImage" label="Lesson Image URL">
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <Form.Item
            name="lessonLevel"
            label="Lesson Level"
            rules={[
              { required: true, message: "Please select a lesson level" },
            ]}
          >
            <Select placeholder="Select a level">
              <Select.Option value="Beginner">Beginner</Select.Option>
              <Select.Option value="Middle">Intermediate</Select.Option>
              <Select.Option value="Advanced">Advanced</Select.Option>
            </Select>
          </Form.Item>

          {/* Lesson Content Sections */}
          <Title level={4}>Lesson Content</Title>
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
                  Delete
                </Button>
              }
            >
              <Form.Item label="Content Type">
                <Select
                  value={section.type}
                  onChange={(value) =>
                    updateLessonContentSection(index, "type", value)
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
                      updateLessonContentSection(
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
                      updateLessonContentSection(index, "url", e.target.value)
                    }
                    placeholder="Enter image URL"
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
            Add Content Section
          </Button>

          {/* Lesson Tests */}
          <Title level={4}>Lesson Tests</Title>
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
                  Delete
                </Button>
              }
            >
              <Form.Item label="Question Type">
                <Select
                  value={test.type}
                  onChange={(value) => updateLessonTest(index, "type", value)}
                >
                  <Select.Option value="text">Text</Select.Option>
                  <Select.Option value="image">Image</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Question">
                <Input
                  value={test.question}
                  onChange={(e) =>
                    updateLessonTest(index, "question", e.target.value)
                  }
                  placeholder="Enter the question"
                />
              </Form.Item>

              {(test.type === "image" || test.type === "image-text") && (
                <Form.Item label="Image URL">
                  <Input
                    value={test.url}
                    onChange={(e) =>
                      updateLessonTest(index, "url", e.target.value)
                    }
                    placeholder="Enter image URL"
                  />
                </Form.Item>
              )}

              <Form.Item label="Options">
                {test.options.map((option, optionIndex) => (
                  <Input
                    key={optionIndex}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...test.options];
                      newOptions[optionIndex] = e.target.value;
                      updateLessonTest(index, "options", newOptions);
                    }}
                    placeholder={`Option ${optionIndex + 1}`}
                    style={{ marginBottom: 8 }}
                  />
                ))}
              </Form.Item>

              <Form.Item label="Correct Answer">
                <Select
                  value={test.correctAnswer}
                  onChange={(value) =>
                    updateLessonTest(index, "correctAnswer", value)
                  }
                  placeholder="Select the correct answer"
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
            Add Test Question
          </Button>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Lesson
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default TeacherDashboardLesson;
