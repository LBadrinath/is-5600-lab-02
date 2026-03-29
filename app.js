document.addEventListener('DOMContentLoaded', () => {
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  const saveButton = document.querySelector('#btnSave');
  const deleteButton = document.querySelector('#btnDelete');

  generateUserList(userData, stocksData);

  saveButton.addEventListener('click', (event) => {
    event.preventDefault();

    const id = document.querySelector('#userID').value;
    const selectedUser = userData.find((u) => String(u.id) === String(id));

    if (!selectedUser) return;

    selectedUser.user.firstname = document.querySelector('#firstname').value.trim();
    selectedUser.user.lastname = document.querySelector('#lastname').value.trim();
    selectedUser.user.address = document.querySelector('#address').value.trim();
    selectedUser.user.city = document.querySelector('#city').value.trim();
    selectedUser.user.email = document.querySelector('#email').value.trim();

    generateUserList(userData, stocksData);
    populateForm(selectedUser);
    renderPortfolio(selectedUser, stocksData);
  });

  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();

    const id = document.querySelector('#userID').value;
    const userIndex = userData.findIndex((u) => String(u.id) === String(id));

    if (userIndex === -1) return;

    userData.splice(userIndex, 1);

    generateUserList(userData, stocksData);
    clearUserForm();
    clearPortfolio();
    clearStockDetails();
  });
});

function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');
  userList.innerHTML = '';

  users.forEach(({ user, id }) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${user.lastname}, ${user.firstname}`;
    listItem.setAttribute('data-id', id);
    userList.appendChild(listItem);
  });

  userList.onclick = (event) => {
    handleUserListClick(event, users, stocks);
  };
}

function handleUserListClick(event, users, stocks) {
  const userId = event.target.getAttribute('data-id');
  if (!userId) return;

  const selectedUser = users.find((u) => String(u.id) === String(userId));
  if (!selectedUser) return;

  populateForm(selectedUser);
  renderPortfolio(selectedUser, stocks);
}

function populateForm(data) {
  const { user, id } = data;

  document.querySelector('#userID').value = id;
  document.querySelector('#firstname').value = user.firstname;
  document.querySelector('#lastname').value = user.lastname;
  document.querySelector('#address').value = user.address;
  document.querySelector('#city').value = user.city;
  document.querySelector('#email').value = user.email;
}

function renderPortfolio(user, stocks) {
  const portfolioList = document.querySelector('.portfolio-list');
  portfolioList.innerHTML = '';

  const heading1 = document.createElement('h3');
  const heading2 = document.createElement('h3');
  const heading3 = document.createElement('h3');

  heading1.textContent = 'Symbol';
  heading2.textContent = '# Shares';
  heading3.textContent = 'Actions';

  portfolioList.appendChild(heading1);
  portfolioList.appendChild(heading2);
  portfolioList.appendChild(heading3);

  user.portfolio.forEach(({ symbol, owned }) => {
    const symbolEl = document.createElement('p');
    const sharesEl = document.createElement('p');
    const actionEl = document.createElement('button');

    symbolEl.textContent = symbol;
    sharesEl.textContent = owned;
    actionEl.textContent = 'View';
    actionEl.setAttribute('data-symbol', symbol);

    portfolioList.appendChild(symbolEl);
    portfolioList.appendChild(sharesEl);
    portfolioList.appendChild(actionEl);
  });

  portfolioList.onclick = (event) => {
    const symbol = event.target.getAttribute('data-symbol');
    if (!symbol) return;

    viewStock(symbol, stocks);
  };
}

function viewStock(symbol, stocks) {
  const stock = stocks.find((s) => s.symbol === symbol);
  if (!stock) return;

  document.querySelector('#stockName').textContent = stock.name;
  document.querySelector('#stockSector').textContent = stock.sector;
  document.querySelector('#stockIndustry').textContent = stock.subIndustry;
  document.querySelector('#stockAddress').textContent = stock.address;
  document.querySelector('#logo').src = `logos/${symbol}.svg`;
  document.querySelector('#logo').alt = `${stock.name} logo`;
}

function clearUserForm() {
  document.querySelector('#userID').value = '';
  document.querySelector('#firstname').value = '';
  document.querySelector('#lastname').value = '';
  document.querySelector('#address').value = '';
  document.querySelector('#city').value = '';
  document.querySelector('#email').value = '';
}

function clearPortfolio() {
  const portfolioList = document.querySelector('.portfolio-list');
  portfolioList.innerHTML = '';

  const heading1 = document.createElement('h3');
  const heading2 = document.createElement('h3');
  const heading3 = document.createElement('h3');

  heading1.textContent = 'Symbol';
  heading2.textContent = '# Shares';
  heading3.textContent = 'Actions';

  portfolioList.appendChild(heading1);
  portfolioList.appendChild(heading2);
  portfolioList.appendChild(heading3);
}

function clearStockDetails() {
  document.querySelector('#stockName').textContent = '';
  document.querySelector('#stockSector').textContent = '';
  document.querySelector('#stockIndustry').textContent = '';
  document.querySelector('#stockAddress').textContent = '';
  document.querySelector('#logo').src = '';
  document.querySelector('#logo').alt = '';
}