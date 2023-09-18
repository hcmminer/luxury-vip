import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SFSchema, SFTreeSelectWidgetSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicFormComponent {
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    goal: new FormControl('', Validators.required),
    standard: new FormControl('', Validators.required),
    client: new FormControl(''),
    invites: new FormControl(''),
    weight: new FormControl(''),
    public: new FormControl(1, [Validators.min(1), Validators.max(3)]),
    publicUsers: new FormControl('')
  });
  submitting = false;

  constructor(
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef
  ) {}

  submit(): void {
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.msg.success(`提交成功`);
      this.cdr.detectChanges();
    }, 1000);
  }




  schema: SFSchema = {
    properties: {
      status1: {
        type: 'string',
        title: '基本',
        enum: [
          { title: '待支付', key: 'WAIT_BUYER_PAY' },
          { title: '已支付', key: 'TRADE_SUCCESS' },
          { title: '交易完成', key: 'TRADE_FINISHED' },
        ],
        default: 'WAIT_BUYER_PAY',
        ui: {
          widget: 'tree-select',
        } as SFTreeSelectWidgetSchema,
      },
      status2: {
        type: 'string',
        title: '多选',
        enum: [
          { title: '待支付', key: 'WAIT_BUYER_PAY' },
          { title: '已支付', key: 'TRADE_SUCCESS' },
          { title: '交易完成', key: 'TRADE_FINISHED' },
        ],
        default: ['WAIT_BUYER_PAY', 'TRADE_SUCCESS'],
        ui: {
          widget: 'tree-select',
          multiple: true,
        } as SFTreeSelectWidgetSchema,
      },
      status3: {
        type: 'string',
        title: '可勾选',
        default: ['WAIT_BUYER_PAY', 'TRADE_FINISHED'],
        ui: {
          widget: 'tree-select',
          checkable: true,
          asyncData: () =>
            of([
              { title: '待支付', key: 'WAIT_BUYER_PAY' },
              { title: '已支付', key: 'TRADE_SUCCESS' },
              { title: '交易完成', key: 'TRADE_FINISHED' },
            ]).pipe(delay(10)),
        } as SFTreeSelectWidgetSchema,
      },
      // 异步数据
      async: {
        type: 'string',
        title: 'Async',
        enum: [
          { title: '待支付', key: 'WAIT_BUYER_PAY' },
          { title: '已支付', key: 'TRADE_SUCCESS' },
          { title: '交易完成', key: 'TRADE_FINISHED' },
        ],
        ui: {
          widget: 'tree-select',
          expandChange: () => {
            return of([
              { title: '待支付', key: 'WAIT_BUYER_PAY' },
              { title: '已支付', key: 'TRADE_SUCCESS' },
              { title: '交易完成', key: 'TRADE_FINISHED' },
            ]).pipe(delay(10));
          },
        } as SFTreeSelectWidgetSchema,
      },
    },
  };



  submit1(value: {}): void {
    this.msg.success(JSON.stringify(value));
  }
}
