import Client from 'ad-engine/utils/client';

const preElement = document.getElementById('browser');

preElement.innerText = `${Client.getOperatingSystem()} ${Client.getBrowser()}`;
