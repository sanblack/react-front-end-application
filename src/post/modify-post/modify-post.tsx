import { Col, Form, Input, message, Modal, Row } from "antd";
import { Rule } from "antd/lib/form";
import { useEffect, useState } from "react";
import { PostDataType } from "../commonPropsType";
import {
  createNewPostRecord,
  editPostRecord,
  fetchPostRecords,
} from "../post-list/api";

interface PropsType {
  editRecord?: PostDataType;
  setEditRecordData: React.Dispatch<React.SetStateAction<PostDataType>>;
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPostListData: React.Dispatch<React.SetStateAction<PostDataType[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const rules: { [key: string]: Rule[] } = {
  id: [
    {
      required: true,
      message: "Please enter name",
    },
  ],
  userId: [
    {
      required: true,
      message: "Please enter name",
    },
  ],
  title: [
    {
      required: true,
      message: "Please enter name",
    },
  ],
  body: [
    {
      required: true,
      message: "Please enter name",
    },
  ],
};

export const ModifyPostData: React.FC<PropsType> = ({
  editRecord,
  isModalVisible,
  setModalVisible,
  setPostListData,
  setLoading,
  setEditRecordData,
}) => {
  const [form] = Form.useForm();
  const [isButtonLoading, setButtonLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!editRecord) return;
    form.setFieldsValue({
      body: editRecord?.body,
      id: editRecord?.id,
      title: editRecord?.title,
      userId: editRecord?.userId,
    });
  }, [editRecord, form]);

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      const record = {
        body: values?.body,
        id: values?.id,
        title: values?.title,
        userId: values?.userId,
      };
      if (record) {
        try {
          setButtonLoading(true);
          await editPostRecord(record)?.then((data) => {
            message.success("Record updated Successfully");
            fetchPostRecords().then((data) => {
              setPostListData(data);
              setLoading(false);
              setEditRecordData({});
              setModalVisible(false);
              setButtonLoading(false);
            });
          });
        } catch (error) {
          setButtonLoading(false);
          message.error("Data delete failed");
        }
      } else {
        try {
          setButtonLoading(true);
          await createNewPostRecord(record)?.then((data) => {
            message.success("Record Created Successfully");
            fetchPostRecords().then((data) => {
              setPostListData(data);
              setLoading(false);
              setModalVisible(false);
              setButtonLoading(false);
            });
          });
        } catch (error) {
          setButtonLoading(false);
          message.error("Record create failed");
        }
      }
      form.resetFields();
    } catch (error) {
      message.error("Please enter all required field");
    }
  };

  const onClickCancel = () => {
    setModalVisible(false);
    setEditRecordData({});
    form.resetFields();
  };

  return (
    <Modal
      visible={isModalVisible}
      title={`${editRecord?.id ? "Update" : "Create"} Post Record`}
      onCancel={onClickCancel}
      onOk={onFinish}
      confirmLoading={isButtonLoading}
    >
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="id" label="Id" rules={rules.id}>
              <Input
                autoComplete="off"
                placeholder="Please enter id"
                disabled={editRecord?.id ? true : false}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="userId" label="UserId" rules={rules.id}>
              <Input
                autoComplete="off"
                placeholder="Please enter user id"
                disabled={editRecord?.userId ? true : false}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="title" label="Title" rules={rules.id}>
              <Input autoComplete="off" placeholder="Please enter id" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="body" label="Body" rules={rules.id}>
              <Input autoComplete="off" placeholder="Please enter id" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
