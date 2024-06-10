import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Select, Upload, Radio, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

export default function AddCompany() {
  const [addCategory] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState([]); // Added state for categories

  const handleAddCategory = async (values) => {
    try {
      const formData = new FormData();
      formData.append("serviceTitle", values.serviceTitle);
      formData.append("description", values.description);
      formData.append("selectCategory", values.category);
      formData.append("siteLink", values.siteLink);
      formData.append("status", values.status);
      if (fileList.length > 0) {
        formData.append("infoImage", fileList[0].originFileObj);
      } else {
        message.error("Please upload an image!");
        return;
      }

      const response = await axios.post("http://localhost:3000/api/v1/information", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        message.success("Information added successfully!");
        addCategory.resetFields();
        setFileList([]);
      } else {
        message.error("Failed to add information");
      }
    } catch (error) {
      console.error("Error adding information:", error);
      message.error("An error occurred while adding information");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/category`);
      setCategories(response.data.result);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      message.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  return (
    <>
    <div className=" w-full h-full p-5 " >
      <Card className="mb-5 mt-10 ">
        <Form
          form={addCategory}
          layout="vertical"
          onFinish={handleAddCategory}
        >
          <h2 className="text-xl font-semibold mb-3">Service Information</h2>

          <Form.Item
            label="Service Title"
            name="serviceTitle"
            rules={[{ required: true, message: "Please input the service title!" }]}
          >
            <Input placeholder="Enter service title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input the description!" }]}
          >
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>

          <Form.Item
            label="Select Category"
            name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Select.Option key={category._id} value={category.category}>
                  {category.category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Site Link"
            name="siteLink"
            rules={[{ required: true, message: "Please input the site link!" }]}
          >
            <Input placeholder="Enter site link" />
          </Form.Item>

          <Form.Item
            label="Image"
            name="infoImage"
            valuePropName="fileList"
            getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Radio.Group>
              <Radio value="active">Active</Radio>
              <Radio value="pending">Pending</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
    </>
  );
}
