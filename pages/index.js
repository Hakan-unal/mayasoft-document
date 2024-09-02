import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Row, Card, Col, Upload, message, notification, Button } from "antd";
import { FaUpload } from "react-icons/fa6";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const uploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export default function Home(props) {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      stack: 1,
      message: "Information",
      description: "Azure uploads all added files",
      className: "custom-class",
      style: {
        width: 600,
      },
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Mayasoft - Document</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Row justify={"center"}>
          <Col span={16} md={8}>
            <Card
              actions={[
                <div onMouseEnter={openNotification}>
                  <FaUpload size={50} key="setting" />
                  {contextHolder}
                </div>,
              ]}
              title="Mayasoft - Azure File Integration"
              type="inner"
            >
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </Card>
          </Col>
        </Row>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return {
    props: { datas: data },
  };
};
