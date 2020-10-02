import axios from 'axios';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

const getBranch = branch => {
  switch (branch) {
    case 'C':
      return 'Comp';
    case 'I':
      return 'IT';
    case 'E':
      return 'ENTC';
    default:
      return branch;
  }
};

const useTable = (dispatchAction, type) => {
  //Searching in the table columns
  const [searchedData, setSearchText] = useState({
    searchText: '',
    searchedColumn: '',
  });
  const searchInput = useRef(null);

  //Edit  data
  const [currentIdx, setCurrentIdx] = useState();
  const [editModal, toggleEditModal] = useState(false);

  //Fetched Faculties from server and assigned here through props
  const dispatch = useDispatch();
  //Edit a  selection from table
  const handleEdit = (key, index) => {
    setCurrentIdx(index);
    toggleEditModal(true);
  };

  const handleDelete = async id => {
    try {
      if (type === 'teacher') {
        const { data } = await axios.post('teacher/delete', {
          teacherId: id,
        });
        dispatch(dispatchAction(data)); // Set updated list from backend
      } else {
        const { data } = await axios.post('teacher/delete-student', {
          studentId: id,
        });
        dispatch(dispatchAction(data)); // Set updated list from backend
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText(prev => ({ ...prev, searchText: '' }));
  };

  return {
    searchedData,
    currentIdx,
    editModal,
    toggleEditModal,
    searchInput,
    handleEdit,
    handleReset,
    handleSearch,
    handleDelete,
    getBranch,
  };
};

export default useTable;
