import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import './PostForm.css';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TimePicker,
  TreeSelect,
  Upload,
  FloatButton,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const FormDisabledDemo = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  return (
    <div class="add-post-form">
      <Form
        labelCol={{
          //span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
        }}
      >

        <Form.Item label="Location">
          <Input />
        </Form.Item>
        <Form.Item label="Date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Time">
          <TimePicker />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Owner Name">
          <Input />
        </Form.Item>
        <Form.Item label="NetID">
          <Input />
        </Form.Item>


        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Dining Hall">
          <div
            style={{
              margin: '2px 0',
            }}
          />
          <Cascader
            options={[
              {
                value: 'North',
                label: 'North',
                children: [
                  {
                    value: 'Bear Necessities',
                    label: 'Bear Necessities',
                  },
                  {
                    value: 'Morrison Hall',
                    label: 'Morrison Hall',
                  },
                  {
                    value: 'Appel Commons (North Star)',
                    label: 'Appel Commons (North Star)',
                  },
                ],
              },
              {
                value: 'Central',
                label: 'Central',
                children: [
                  {
                    value: 'Okenshields',
                    label: 'Okenshields',
                  },
                ],
              },
              {
                value: 'West',
                label: 'West',
                children: [
                  {
                    value: 'Becker',
                    label: 'Becker',
                  },
                  {
                    value: 'Cook',
                    label: 'Cook',
                  },
                  {
                    value: 'Jansens',
                    label: "Jansen's",
                  },
                  {
                    value: 'Keeton',
                    label: 'Keeton',
                  },
                  {
                    value: 'Rose',
                    label: 'Rose',
                  },
                ],
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Show name on post" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>
        <Button type="primary" size="large">
          Submit
        </Button>
        <FloatButton.BackTop />

      </Form >
    </div>
  );
};
export default () => <FormDisabledDemo />;