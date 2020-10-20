import axios from 'axios';
import config from '../config';

let chatContent = [];
const getChatContent = () => chatContent;
const setChatContent = (content) => {
  if(content){
    if(typeof content === 'string'){
      chatContent = [content];
    }else{
      chatContent = [...content];
    }
  }else{
    chatContent = [];
  }
}

const messageQueue = [];
export {messageQueue, getChatContent, setChatContent};

export default class AppService {
  constructor(){
    this._baseUrl = `${config.backend.baseUrl}`;
  }

  getStatus = async () => {
    let resp = await axios.get(`${this._baseUrl}/status`);
    return resp.data;
  }

  getSettings = async () => {
    let resp = await axios.get(`${this._baseUrl}/settings`);
    return resp.data;
  }

  mergeSettings = async (settings) => {
    let resp = await axios.post(`${this._baseUrl}/settings`, settings);
    this.loadSettings(settings);
    return resp.data;
  }

  loadSettings = async (settings) => {
    if(!settings){
      settings = await this.getSettings();
    }
    //update generator settings
    let {generator_batch_size} = settings;
    if(generator_batch_size){
      config.backend.generator.batchSize = parseInt(generator_batch_size);
    }
  }
}