import { FC } from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

export const ProfileIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M9.97207 11.5609C11.5783 11.5609 12.969 10.9913 14.1056 9.86737C15.2419 8.74365 15.8182 7.36871 15.8182 5.78027C15.8182 4.19238 15.2421 2.81726 14.1054 1.69318C12.9688 0.569641 11.5781 0 9.97207 0C8.36564 0 6.97514 0.569641 5.83869 1.69336C4.70225 2.81708 4.12598 4.1922 4.12598 5.78027C4.12598 7.36871 4.70225 8.74384 5.83869 9.86755C6.97551 10.9911 8.3662 11.5609 9.97207 11.5609V11.5609ZM6.84459 2.68781C7.71659 1.82556 8.73952 1.40643 9.97207 1.40643C11.2044 1.40643 12.2275 1.82556 13.0997 2.68781C13.9717 3.55023 14.3958 4.56189 14.3958 5.78027C14.3958 6.99902 13.9717 8.0105 13.0997 8.87292C12.2275 9.73535 11.2044 10.1545 9.97207 10.1545C8.73989 10.1545 7.71696 9.73517 6.84459 8.87292C5.97239 8.01068 5.54833 6.99902 5.54833 5.78027C5.54833 4.56189 5.97239 3.55023 6.84459 2.68781Z" />
    <path d="M20.201 18.4549C20.1682 17.9872 20.1019 17.4771 20.0043 16.9384C19.9058 16.3957 19.7789 15.8826 19.6271 15.4137C19.4701 14.929 19.2569 14.4504 18.993 13.9917C18.7195 13.5156 18.3981 13.1011 18.0373 12.7599C17.6601 12.4031 17.1983 12.1161 16.6642 11.9069C16.132 11.6987 15.5422 11.5932 14.9113 11.5932C14.6636 11.5932 14.4239 11.6937 13.9612 11.9916C13.6764 12.1753 13.3432 12.3877 12.9714 12.6226C12.6535 12.8229 12.2227 13.0106 11.6907 13.1805C11.1716 13.3466 10.6446 13.4308 10.1243 13.4308C9.6043 13.4308 9.07728 13.3466 8.55785 13.1805C8.02639 13.0108 7.59548 12.8231 7.27808 12.6228C6.90976 12.3901 6.57644 12.1777 6.28737 11.9915C5.82498 11.6935 5.58536 11.593 5.33759 11.593C4.7065 11.593 4.11689 11.6987 3.58488 11.907C3.05119 12.116 2.58917 12.4029 2.21159 12.7601C1.85086 13.1014 1.52939 13.5158 1.25607 13.9917C0.992558 14.4504 0.779232 14.9288 0.622201 15.4139C0.470539 15.8828 0.343692 16.3957 0.245177 16.9384C0.147402 17.4764 0.0812935 17.9867 0.0485169 18.4554C0.0162957 18.9138 0 19.3907 0 19.8727C0 21.1255 0.402764 22.1397 1.197 22.8877C1.98141 23.6258 3.01915 24.0001 4.28152 24.0001H15.9685C17.2305 24.0001 18.2683 23.6258 19.0529 22.8877C19.8473 22.1403 20.25 21.1257 20.25 19.8725C20.2499 19.3889 20.2334 18.9119 20.201 18.4549V18.4549ZM18.0722 21.8687C17.5538 22.3565 16.8657 22.5936 15.9683 22.5936H4.28152C3.38396 22.5936 2.69583 22.3565 2.1777 21.8689C1.66939 21.3904 1.42236 20.7373 1.42236 19.8727C1.42236 19.423 1.43736 18.9789 1.46736 18.5527C1.49661 18.1345 1.55643 17.675 1.64513 17.1869C1.73272 16.7048 1.8442 16.2523 1.97678 15.8427C2.104 15.45 2.27751 15.061 2.49269 14.6864C2.69805 14.3293 2.93434 14.023 3.19507 13.7762C3.43895 13.5453 3.74635 13.3563 4.10856 13.2146C4.44355 13.0835 4.82002 13.0117 5.22871 13.0009C5.27852 13.0271 5.36722 13.0771 5.51092 13.1697C5.80332 13.3582 6.14034 13.5731 6.51292 13.8084C6.93291 14.0732 7.474 14.3123 8.12046 14.5187C8.78136 14.73 9.45541 14.8373 10.1245 14.8373C10.7935 14.8373 11.4678 14.73 12.1283 14.5189C12.7753 14.3121 13.3162 14.0732 13.7367 13.808C14.118 13.5671 14.4456 13.3583 14.738 13.1697C14.8817 13.0773 14.9704 13.0271 15.0202 13.0009C15.4291 13.0117 15.8056 13.0835 16.1407 13.2146C16.5028 13.3563 16.8102 13.5455 17.054 13.7762C17.3148 14.0228 17.5511 14.3292 17.7564 14.6866C17.9718 15.061 18.1455 15.4501 18.2725 15.8425C18.4053 16.2527 18.517 16.705 18.6044 17.1867C18.6929 17.6758 18.7529 18.1354 18.7821 18.5529V18.5532C18.8123 18.9778 18.8275 19.4217 18.8277 19.8727C18.8275 20.7375 18.5805 21.3904 18.0722 21.8687V21.8687Z" />
  </SvgIcon>
)
