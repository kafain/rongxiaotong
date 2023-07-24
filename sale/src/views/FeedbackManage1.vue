<template>
    <div class="FeedbackMannage">
        <el-table
            ref="multipleTable"
            tooltip-effect="dark"
            style="width: 100%"
            :data="userData">
            <el-table-column prop="userName" label="用户名"></el-table-column>
            <el-table-column prop="phone" label="电话" width="120"> </el-table-column>
            <el-table-column prop="feedback" label="反馈" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建日期" width="100">
                <template slot-scope="scope">{{
                scope.row.createTime.slice(0, 10)
                }}</template>
            </el-table-column>
            <el-table-column label="是否解决" width="110">
                <template slot-scope="scope">
                <div>
                    <el-button type="danger" icon="el-icon-delete" circle
                    @click="deleteFeedback(scope.row.userName)"></el-button>
                    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                    <span>如果已解决，将删除此条反馈</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="success" @click="managerDeleteUser(deleteUserName)">确 定</el-button>
                    </span>
                    </el-dialog>
                </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="用户信息"
            :visible.sync="dialogFormVisible"
            class="manager-change-user-info"
            >
            <el-form class="user-info">
                <el-form-item
                label="用户名"
                :label-width="formLabelWidth"
                class="manager-change-name"
                >
                <el-input
                    autocomplete="off"
                    v-model="updateUserData.userName"
                    :disabled="true"
                ></el-input>
                </el-form-item>
                <el-form-item
                label="电话"
                :label-width="formLabelWidth"
                class="manager-change-phone"
                >
                <el-input
                    autocomplete="off"
                    v-model="updateUserData.phone"
                ></el-input>
                </el-form-item>
                <el-form-item
                label="反馈"
                :label-width="formLabelWidth"
                class="manager-change-feedback"
                >
                <el-input
                    autocomplete="off"
                    v-model="updateUserData.feedback"
                ></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>
        <pagination
        :cUrl="url"
        :cTotal="total"
        :cPageSize="pageSize"
        @item-click="pageClick"
        ></pagination>
    </div>
</template>
<script>
import {deleteFeedbackByUsername,updateUserByUsername} from "../api/feedback"

export default{
    data(){
        return{
            deleteUserName: "",
            dialogVisible: false,
            dialogFormVisible: false,
            updateUserData: {},
            total: 0,
        }
    },
    methods:{
        deleteFeedback(deleteUserName) {
            this.deleteUserName = deleteUserName;
            this.dialogVisible = true;
        },
        managerDeleteUser(userName) {
            this.dialogVisible = false;
            deleteFeedbackByUsername({
                user_name: userName,
            }).then((res) => {
                if (res.flag == true) {
                alert(res.message);
                this.reload();
                } else {
                alert(res.data);
                }
            });
        },
        created() {
            this.$store.commit("updateUserActiveIndex", "5");
            selectAllFeedback({
                pageNum:this.usersCount,
            }).then((res) => {
                this.userData = res.data.list;
                this.total = res.data.total;
            })
            .catch((err) => {
                console.log(err);
            });
        },
    }
}
</script>
<style>
.FeedbackManage{
    width: 1100px;
    background: #fff;
    margin: 10px auto;
    padding: 10px 20px;
}
</style>