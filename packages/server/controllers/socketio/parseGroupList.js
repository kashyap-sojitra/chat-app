const parseGroupList = async groupList => {
  const newGroupList = [];
  for (let group of groupList) {
    newGroupList.push({
      groupId: group
    });
  }
  return newGroupList;
};

module.exports = parseGroupList;
