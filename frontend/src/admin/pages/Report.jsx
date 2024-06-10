import React, { useState, useEffect } from 'react';
import { Table, Button, notification, Modal, Input, Dropdown, Menu } from 'antd';
import axios from 'axios';

export default function Report() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState({});
  const [warningText, setWarningText] = useState('');
  const [onetimepopup,SetoneTimePopup] = useState(false)

  useEffect(() => {
    const fetchReportedReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/v1/reportedReviews');
        const reportedReviews = response.data.result.reverse();
        
        // Map the data to match the table's data structure
        const formattedData = reportedReviews.map((review, index) => ({
          key: index,
          companyName: review.companyName,
          message: review.message,
          review: review.review,
          report: review.action,
          userName: review.userName,
          warning: review.warning,
          userID: review.userID,  // Ensure userID is included
          reviewId: review.reviewId, // Include reviewId for deletion
        }));

        setDataSource(formattedData);
      } catch (error) {
        console.error('Failed to fetch reported reviews', error);
        notification.error({ message: 'Failed to fetch reported reviews' });
      } finally {
        setLoading(false);
      }
    };

    fetchReportedReviews();
  }, [currentReview.reviewId]);

  const showModal = (review) => {
    setCurrentReview(review);
    setIsModalVisible(true);
  };

 // Add WebSocket broadcast call to handleOk function
const handleOk = async () => {
  if (currentReview && currentReview.userID) {
    const warningPayload = {
      userID: currentReview.userID,
      warningText: warningText,
      warningNumber: currentReview.warning ? currentReview.warning.length + 1 : 1,
      reviewId: currentReview.reviewId // Include reviewId in the payload
    };

    try {
      await axios.post('http://localhost:3000/api/v1/warning', warningPayload);
      notification.success({ message: 'Warning generated successfully' });

      // Update the local dataSource state to reflect the new warning
      setDataSource(prevDataSource => 
        prevDataSource.map(item => 
          item.key === currentReview.key ? { ...item, warning: [...(item.warning || []), warningText] } : item
        )
      );

      setIsModalVisible(false);
      setWarningText('');
    } catch (error) {
      console.error('Failed to generate warning', error);
      notification.error({ message: 'Failed to generate warning' });
    }
  } else {
    notification.error({ message: 'UserID is missing for the current review' });
  }
};

  const handleCancel = () => {
    setIsModalVisible(false);
    setWarningText('');
  };

  const deleteReview = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/reviews/${currentReview.reviewId}`);
      notification.success({ message: 'Review deleted successfully' });

      // Update the local dataSource state to reflect the deletion
      setDataSource(prevDataSource => prevDataSource.filter(item => item.key !== currentReview.key));

      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to delete review', error);
      notification.error({ message: 'Failed to delete review' });
    }
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'block') {
      console.log(`Block action for ${currentReview.userName}`);
    } else if (key === 'unblock') {
      console.log(`Unblock action for ${currentReview.userName}`);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="block">Block</Menu.Item>
      <Menu.Item key="unblock">Unblock</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Review',
      dataIndex: 'review',
      key: 'review',
    },
    {
      title: 'Report',
      dataIndex: 'report',
      key: 'report',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Warning',
      dataIndex: 'warning',
      key: 'warning',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button type="primary" className='bg-blue-500 text-white' onClick={() => showModal(record)}>Take Action</Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button className='ml-2'>Actions</Button>
          </Dropdown>
        </div>
      ),
    },
  ];


  return (
    <div className='w-full min-h-screen p-5'>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10 }}
        loading={loading}
      />
      <Modal
        title="Generating Warning"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="delete" type="danger" className='bg-red-500 text-white' onClick={deleteReview}>
            Delete Review
          </Button>,
          <Button key="submit" type="primary" className='bg-green-500 text-white' onClick={handleOk}>
            Generate Warning
          </Button>,
        ]}
      >
        <Input 
          value={warningText}
          onChange={(e) => setWarningText(e.target.value)}
          placeholder="Enter warning text"
        />
      </Modal>
    </div>
  );
}
