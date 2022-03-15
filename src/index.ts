/**
 * @description wangEditor v5 demo
 * @author wangfupeng
 */

// import { IButtonMenu } from '@wangeditor/core'
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar, IEditorConfig, IDomEditor,
    SlateElement, SlateTransforms, SlateEditor, SlateNode, DomEditor, SlateText, Boot } from '@wangeditor/editor'
// import fn from './render'

// // 第三方插件 ctrl-enter
// import ctrlEnterModule from '@wangeditor/plugin-ctrl-enter'
// Boot.registerModule(ctrlEnterModule)

// 第三方插件 markdown
import markdownModule from '@wangeditor/plugin-md'
Boot.registerModule(markdownModule)

// 第三方插件 link-card
import linkCardModule from '@wangeditor/plugin-link-card'
Boot.registerModule(linkCardModule)

// 第三方插件 上传附件
import attachmentModule, { AttachmentElement } from '@wangeditor/plugin-upload-attachment'
Boot.registerModule(attachmentModule)

// 第三方插件 formula ，还需要配置 hoverbarKeys 和 insertKeys
import formulaModule from '@wangeditor/plugin-formula'
Boot.registerModule(formulaModule)

// 第三方插件 mention ，需要配置 mentionConfig
import mentionModule from '@wangeditor/plugin-mention'
Boot.registerModule(mentionModule)
const linkCardHtml = `<div data-w-e-type="link-card" data-w-e-is-void data-title="百度新闻" data-link="http://news.baidu.com/" data-iconImgSrc="https://news-bos.cdn.bcebos.com/mvideo/log-news.png">
  <div class="info-container">
    <div class="title-container"><p>百度新闻</p></div>
    <div class="link-container"><span>http://news.baidu.com/</span></div>
  </div>
  <div class="icon-container">
    <img src="https://news-bos.cdn.bcebos.com/mvideo/log-news.png"/>
  </div>
</div>`

const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容',
    hoverbarKeys: {
        formula: {
            menuKeys: [
                'editFormula', // “编辑公式”菜单
            ],
        },
        attachment: {
            menuKeys: [
                'downloadAttachment', // “下载附件”菜单
            ]
        },
        link: {
            menuKeys: ['editLink', 'unLink', 'viewLink', 'convertToLinkCard'], // 增加 '转为链接卡片'菜单
        },
    },
    MENU_CONF: {
        // “上传附件”菜单的配置
        uploadAttachment: {
            server: 'http://106.12.198.214:3000/api/upload-video',
            fieldName: 'custom-fileName',
            // 插入到编辑器后的回调
            onInsertedAttachment(elem: AttachmentElement) {
                console.log('inserted attachment ---- ', elem)
            },
        },

        // “转为链接卡片”菜单配置
        convertToLinkCard: {
            async getLinkCardInfo(linkText: string, linkUrl: string) {
                return new Promise(resolve => {
                    setTimeout(() => {
                      const info = { title: `${linkText} - 123`, iconImgSrc: '' }
                      resolve(info)
                    }, 100)
                  })
            }
        }
    },
    EXTEND_CONF: {
        mentionConfig: {
            showModal() {
                console.log('show mention modal')
            },
            hideModal() {
                console.log('hide mention modal')
            },
        }
    },
}

// 创建编辑器1
const editor = createEditor({
    selector: '#editor-container-1',
    // content: [
    //     // 一行文字
    //     {
    //         type: 'paragraph',
    //         children: [
    //             { text: 'hello world ~~~ ' }
    //         ]
    //     }
    // ],
    // // 公式 html
    // html: '<p>hello&nbsp;<strong>world</strong>&nbsp;<span data-w-e-type="formula" data-w-e-is-void data-w-e-is-inline data-value="c = \\pm\\sqrt{a^2 + b^2}"></span></p>',
    // mention html
    // html: '<p>hello&nbsp;world<span data-w-e-type="mention" data-w-e-is-void data-w-e-is-inline data-value="小明" data-info="%7B%22x%22%3A10%7D">@小明</span></p><p>123123<span data-w-e-type="attachment" data-w-e-is-void data-w-e-is-inline data-link="http://106.12.198.214:3000/upload-files/custom-fileName-s26" data-fileName="demo1.mp4">demo1.mp4</span>111</p>',
    // link-card html
    html: `<p>hello&nbsp;world</p>${linkCardHtml}`,
    mode: 'default',
    config: editorConfig
})
// 创建工具栏1
const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container-1',
    mode: 'default',
    config: {
        // modalAppendToBody: true
        insertKeys: {
            index: 0,
            keys: [
                'insertFormula', // “插入公式”菜单
                // 'editFormula',

                'uploadAttachment', // “下载附件”菜单
            ],
        },
    }
})

// @ts-ignore
window.editor = editor

document.getElementById('btn-1')?.addEventListener('click', () => {
    console.log('clicked')
})

document.getElementById('btn-2')?.addEventListener('click', () => {
    const content = [
        {
            type: 'header1',
            textAlign: 'center',
            children: [
              {
                text: '一行标题',
              },
            ],
        },
        {
            type: 'paragraph',
            children: [
              { text: 'hello world ~~~ ' },
              {
                type: 'link',
                url: 'https://www.slatejs.org/examples/links',
                children: [{ text: 'slate examples' }],
              },
              { text: '!' },
            ],
        },
    ]

    const e = createEditor({ content })
    console.log(e.getHtml())
})

