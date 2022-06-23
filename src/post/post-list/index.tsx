import { useEffect, useState } from "react";
import { PostDataType } from "../commonPropsType";
import { deletePostRecord, fetchPostRecords } from "./api";
import { Button, message, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ModifyPostData } from "../modify-post/modify-post";
import { useSelector } from "react-redux";
import { Store } from "../../store/store.model";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/session";

export const PostList: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector((store: Store) => store?.session);
  const [postListData, setPostListData] = useState<PostDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [editRecord, setEditRecordData] = useState<PostDataType>({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchPostRecords().then((data) => {
      setPostListData(data);
      setLoading(false);
    });
  }, []);

  const onClickEditRecord = (data: PostDataType) => {
    setEditRecordData(data);
    setModalVisible(true);
  };

  const deleteRecord = async (record: PostDataType) => {
    try {
      await deletePostRecord(record)?.then((data) => {
        message.success("Selected Record deleted Successfully");
        fetchPostRecords().then((data) => {
          setPostListData(data);
          setLoading(false);
        });
      });
    } catch (error) {
      message.error("Data deletion failed");
    }
  };

  const tableColumns: ColumnsType<PostDataType> = [
    {
      title: "S no",
      render: (_, record, index) => <span>{(page - 1) * 10 + index + 1}</span>,
    },
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
    },
    session?.isAuthenticated
      ? {
          title: "Edit",
          render: (_, record) => (
            <div className="d-flex align-items-center">
              <Button
                icon={<EditOutlined />}
                size="small"
                onClick={() => onClickEditRecord(record)}
              />
            </div>
          ),
        }
      : {},
    session?.isAuthenticated
      ? {
          title: "Delete",
          render: (_, record) => (
            <div className="d-flex align-items-center">
              <Popconfirm
                title="Are you sure to delete this record?"
                onConfirm={() => deleteRecord(record)}
              >
                <Button icon={<DeleteOutlined />} size="small" className="ml" />
              </Popconfirm>
            </div>
          ),
        }
      : {},
  ];

  const onClickLogin = () => {
    dispatch(login() as any);
  };

  const onClickLogout = () => {
    dispatch(logout() as any);
  };

  return (
    <div>
      <div className="text-right" style={{ marginBottom: 20 }}>
        {session?.isAuthenticated ? (
          <Button type="primary" danger onClick={onClickLogout}>
            Logout
          </Button>
        ) : (
          <Button type="primary" onClick={onClickLogin}>
            Login
          </Button>
        )}
      </div>
      <div style={{ marginBottom: 20 }}></div>
      <h4>Post record data</h4>
      <ModifyPostData
        editRecord={editRecord}
        setEditRecordData={setEditRecordData}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        setPostListData={setPostListData}
        setLoading={setLoading}
      />
      {session?.isAuthenticated ? (
        <div className="text-right" style={{ marginBottom: 20 }}>
          <Button
            type="primary"
            size={"large"}
            onClick={() => {
              setModalVisible(true);
            }}
          >
            Create New Post
          </Button>
        </div>
      ) : null}

      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={postListData}
          loading={loading}
          rowKey="_id"
          pagination={{
            onChange(current) {
              setPage(current);
            },
          }}
        />
      </div>
    </div>
  );
};
