const PercyScript = require('@percy/script');
var BaseAction = require('./baseAction');

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + mm + dd;

const options = {headless: false,
   args: ['--window-size=1368,768']};
PercyScript.run(async (page, percySnapshot) => {
  var action = new BaseAction(page);
  //Login
  await page.setViewport({width:1368, height:768});
  await page.goto('https://demo.axi.ai/');
  await percySnapshot('Dashboard');

  await action.click('div.login-button');
  await percySnapshot('Google Page');

  await page.waitFor(40000);
  await percySnapshot('Home Page');

  //Create new follow and Connect to SAP system
  await action.click('a[href="/flows/connector"] div.level-0');
  await percySnapshot('SAP Connect Page');

  await action.click('button[class="action-item"]');
  await page.waitFor(1000);
  await percySnapshot('Setup Connection Page');

  await page.type('input[id="application-server"]','sap.agilexi.net' );
  await page.type('input[id="system-id"]','BXD' );
  await page.type('input[id="client"]','100' );
  await page.type('input[id="user"]','TESTUSERA' );
  await page.type('input[id="password"]','m7!8s\\Sl[{!');
  await percySnapshot('Setup Connection Page 2');
  await action.click('button>span');
  await page.waitFor(8000);

  //Select Data Source Type 
  await action.click('label>span');
  await percySnapshot('Select Query 1');
  await page.waitFor(3000);
  await action.click('button[id="next"]');
  await page.waitFor(5000);
  await page.type('input[type="text"]',`TEST_A_001` );
  await page.waitFor(1000);
  await percySnapshot('Select Query 2');
  await action.click('td[title="QRY_TEST_A_001"]');
  await action.click('button[id="next"]');
  await page.waitFor(5000);

  await action.click('label[class="show-details-label"]');
  await page.waitFor(3000);

  await percySnapshot('Show technical details');

  await action.click('label[for="characteristics"]');
  await page.waitFor(1000);
  await action.click('label[for="key-figures"]');
  await page.waitFor(1000);
  await percySnapshot('​Select columns of query');
  await action.click('button[id="finish"]');
  await page.waitFor(5000);

  await action.click('ng-select[id="project-select"]>div');
  await page.waitFor(2000);
  await action.click('div[class="ng-dropdown-panel-items scroll-host"] div div:nth-child(1)');
  await page.waitFor(2000);
  await action.click('ng-select[id="dataset-select"]>div');
  await page.waitFor(2000);
  await action.click('div[class="ng-dropdown-panel-items scroll-host"] div div:nth-child(1)');
  await action.click('ng-select[id="table-select"]>div');
  await page.waitFor(2000);
  await action.click('div[class="ng-dropdown-panel-items scroll-host"] div div:nth-child(1)');
  await page.type('input[id="table-name"]',`TBL_QRYTA_USERA_` + today );
  await page.waitFor(1000);
  await percySnapshot('​Load data in Google BigQuery');
  await action.click('button[id="finish"]');
  await page.waitFor(180000);
  await percySnapshot('​Load data in Google BigQuery 2');
}, options);
